// src/utils.js
export function createPageUrl(page) {
  switch (page) {
    case 'Home':
      return '/';
    case 'Services':
      return '/services';
    case 'About':
      return '/about';
    case 'Contact':
      return '/contact';
    case 'Magazine':
      return '/magazine';
    case 'MagazineArticle':
      return '/magazinearticle';
    case 'Tools':
      return '/tools';
    case 'Courses':
      return '/courses';
    case 'Geo':
      return '/geo';
    default:
      return '/';
  }
}
