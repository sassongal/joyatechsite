#!/usr/bin/env node
/**
 * Migration script: JSON files to Firestore
 * 
 * Usage:
 *   1. Set up Firebase Admin credentials:
 *      export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
 *   
 *   2. Run the script:
 *      node scripts/migrateToFirestore.js
 * 
 *   Options:
 *      --dry-run    Preview changes without writing to Firestore
 *      --articles   Migrate only articles
 *      --tools      Migrate only tools
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const migrateArticlesOnly = args.includes('--articles');
const migrateToolsOnly = args.includes('--tools');

console.log('🚀 Firestore Migration Script');
console.log('=============================');
if (isDryRun) {
  console.log('⚠️  DRY RUN MODE - No changes will be made\n');
}

// Initialize Firebase Admin
function initFirebase() {
  if (getApps().length === 0) {
    // Check for service account file
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    
    if (serviceAccountPath && existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
      initializeApp({
        credential: cert(serviceAccount)
      });
      console.log('✅ Firebase Admin initialized with service account\n');
    } else {
      // Try to use default credentials (when running in Firebase/GCP environment)
      initializeApp();
      console.log('✅ Firebase Admin initialized with default credentials\n');
    }
  }
  return getFirestore();
}

// Transform article from JSON to Firestore format
function transformArticle(article) {
  return {
    slug: article.slug || article.id,
    title_he: article.title_he || '',
    title_en: article.title_en || '',
    content_he: article.content_he || '',
    content_en: article.content_en || '',
    excerpt_he: article.excerpt_he || '',
    excerpt_en: article.excerpt_en || '',
    category: article.category || 'tutorials',
    author: article.author || 'Gal Sasson',
    authorImage: article.author_image || '',
    featuredImage: article.image || '',
    tags: article.tags || [],
    featured: article.featured || false,
    published: true,
    readTime: article.readTime || 5,
    seoTitle_he: article.title_he || '',
    seoTitle_en: article.title_en || '',
    seoDescription_he: article.excerpt_he || '',
    seoDescription_en: article.excerpt_en || '',
    createdAt: article.date ? Timestamp.fromDate(new Date(article.date)) : Timestamp.now(),
    updatedAt: Timestamp.now(),
    publishedAt: article.date ? Timestamp.fromDate(new Date(article.date)) : Timestamp.now(),
    version: 1
  };
}

// Transform tool from JSON to Firestore format
function transformTool(tool) {
  return {
    name_he: tool.name_he || tool.name || '',
    name_en: tool.name_en || tool.name || '',
    description_he: tool.description_he || '',
    description_en: tool.description_en || '',
    category: tool.category || 'content',
    url: tool.url || '',
    logo: tool.logo || '',
    pricing: tool.pricing || 'freemium',
    rating: tool.rating || 4,
    pros_he: tool.pros_he || [],
    pros_en: tool.pros_en || [],
    cons_he: tool.cons_he || [],
    cons_en: tool.cons_en || [],
    useCases_he: tool.use_cases_he || tool.useCases_he || [],
    useCases_en: tool.use_cases_en || tool.useCases_en || [],
    featured: tool.featured || false,
    published: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
}

// Migrate articles
async function migrateArticles(db) {
  console.log('📄 Migrating Articles...');
  
  const articlesPath = join(__dirname, '../public/all-articles-final.json');
  
  if (!existsSync(articlesPath)) {
    console.log('   ⚠️  Articles file not found, skipping\n');
    return 0;
  }

  const articles = JSON.parse(readFileSync(articlesPath, 'utf8'));
  console.log(`   Found ${articles.length} articles`);

  let migrated = 0;
  const batch = db.batch();

  for (const article of articles) {
    const transformed = transformArticle(article);
    const docRef = db.collection('articles').doc(article.id);
    
    if (isDryRun) {
      console.log(`   [DRY RUN] Would create: ${article.id} - ${transformed.title_he.substring(0, 50)}...`);
    } else {
      batch.set(docRef, transformed);
    }
    migrated++;
  }

  if (!isDryRun && migrated > 0) {
    await batch.commit();
    console.log(`   ✅ Migrated ${migrated} articles\n`);
  } else {
    console.log(`   ℹ️  Would migrate ${migrated} articles\n`);
  }

  return migrated;
}

// Migrate tools
async function migrateTools(db) {
  console.log('🔧 Migrating Tools...');
  
  const toolsPath = join(__dirname, '../public/all-tools-final.json');
  
  if (!existsSync(toolsPath)) {
    console.log('   ⚠️  Tools file not found, skipping\n');
    return 0;
  }

  const tools = JSON.parse(readFileSync(toolsPath, 'utf8'));
  console.log(`   Found ${tools.length} tools`);

  let migrated = 0;
  const batch = db.batch();

  for (const tool of tools) {
    const transformed = transformTool(tool);
    const docRef = db.collection('tools').doc(tool.id);
    
    if (isDryRun) {
      console.log(`   [DRY RUN] Would create: ${tool.id} - ${transformed.name_he}`);
    } else {
      batch.set(docRef, transformed);
    }
    migrated++;
  }

  if (!isDryRun && migrated > 0) {
    await batch.commit();
    console.log(`   ✅ Migrated ${migrated} tools\n`);
  } else {
    console.log(`   ℹ️  Would migrate ${migrated} tools\n`);
  }

  return migrated;
}

// Create initial settings document
async function createSettings(db) {
  console.log('⚙️  Creating Settings...');
  
  const settings = {
    siteName: 'Joya-Tech',
    siteDescription_he: 'פתרונות דיגיטליים מתקדמים לעסקים',
    siteDescription_en: 'Advanced digital solutions for businesses',
    contactEmail: 'info@joyatech.com',
    contactPhone: '+972-54-646-8676',
    socialLinks: {
      facebook: '',
      instagram: '',
      linkedin: 'https://www.linkedin.com/company/joya-tech',
      twitter: '',
      whatsapp: 'https://wa.me/972546468676'
    },
    analytics: {
      gaId: ''
    },
    updatedAt: Timestamp.now()
  };

  if (isDryRun) {
    console.log('   [DRY RUN] Would create settings document\n');
  } else {
    await db.collection('settings').doc('global').set(settings);
    console.log('   ✅ Created settings document\n');
  }
}

// Main migration function
async function main() {
  try {
    const db = initFirebase();
    
    let totalMigrated = 0;
    
    if (!migrateToolsOnly) {
      totalMigrated += await migrateArticles(db);
    }
    
    if (!migrateArticlesOnly) {
      totalMigrated += await migrateTools(db);
    }
    
    if (!migrateArticlesOnly && !migrateToolsOnly) {
      await createSettings(db);
    }
    
    console.log('=============================');
    if (isDryRun) {
      console.log(`🏁 Dry run complete. Would migrate ${totalMigrated} documents.`);
      console.log('   Run without --dry-run to apply changes.');
    } else {
      console.log(`🎉 Migration complete! Migrated ${totalMigrated} documents.`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
