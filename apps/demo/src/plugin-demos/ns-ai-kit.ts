import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNsAiKit } from '@demo/shared';
import {} from '@marrocode/ns-ai-kit';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNsAiKit {}
