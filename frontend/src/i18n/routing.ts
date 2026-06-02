import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['ko', 'en', 'zh', 'ja'],
  defaultLocale: 'ko'
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
