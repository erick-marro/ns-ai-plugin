import { NavigatedData, Page } from '@nativescript/core';
import { MainViewModel } from './main-view-model';

export function navigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  // Asigna el ViewModel como el contexto de la página
  page.bindingContext = new MainViewModel();
}
