/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import cards8Parser from './parsers/cards8.js';
import accordion3Parser from './parsers/accordion3.js';
import columns7Parser from './parsers/columns7.js';
import columns4Parser from './parsers/columns4.js';
import columns5Parser from './parsers/columns5.js';
import cards6Parser from './parsers/cards6.js';
import accordion10Parser from './parsers/accordion10.js';
import cards1Parser from './parsers/cards1.js';
import hero13Parser from './parsers/hero13.js';
import columns2Parser from './parsers/columns2.js';
import tabs9Parser from './parsers/tabs9.js';
import columns12Parser from './parsers/columns12.js';
import columns16Parser from './parsers/columns16.js';
import cards18Parser from './parsers/cards18.js';
import cards11Parser from './parsers/cards11.js';
import cards19Parser from './parsers/cards19.js';
import cards24Parser from './parsers/cards24.js';
import cards21Parser from './parsers/cards21.js';
import columns30Parser from './parsers/columns30.js';
import table26Parser from './parsers/table26.js';
import columns32Parser from './parsers/columns32.js';
import carousel25Parser from './parsers/carousel25.js';
import hero22Parser from './parsers/hero22.js';
import columns17Parser from './parsers/columns17.js';
import columns36Parser from './parsers/columns36.js';
import cards31Parser from './parsers/cards31.js';
import cards23Parser from './parsers/cards23.js';
import columns14Parser from './parsers/columns14.js';
import columns35Parser from './parsers/columns35.js';
import cardsNoImages28Parser from './parsers/cardsNoImages28.js';
import columns42Parser from './parsers/columns42.js';
import columns44Parser from './parsers/columns44.js';
import columns38Parser from './parsers/columns38.js';
import tabs33Parser from './parsers/tabs33.js';
import tableStriped15Parser from './parsers/tableStriped15.js';
import columns39Parser from './parsers/columns39.js';
import embedVideo46Parser from './parsers/embedVideo46.js';
import columns49Parser from './parsers/columns49.js';
import tabs50Parser from './parsers/tabs50.js';
import embedVideo40Parser from './parsers/embedVideo40.js';
import video45Parser from './parsers/video45.js';
import cards41Parser from './parsers/cards41.js';
import cards51Parser from './parsers/cards51.js';
import accordion58Parser from './parsers/accordion58.js';
import columns53Parser from './parsers/columns53.js';
import accordion59Parser from './parsers/accordion59.js';
import cards52Parser from './parsers/cards52.js';
import columns61Parser from './parsers/columns61.js';
import cards48Parser from './parsers/cards48.js';
import cards62Parser from './parsers/cards62.js';
import cards57Parser from './parsers/cards57.js';
import cards56Parser from './parsers/cards56.js';
import cards63Parser from './parsers/cards63.js';
import carousel43Parser from './parsers/carousel43.js';
import hero65Parser from './parsers/hero65.js';
import columns67Parser from './parsers/columns67.js';
import columns69Parser from './parsers/columns69.js';
import carousel55Parser from './parsers/carousel55.js';
import hero68Parser from './parsers/hero68.js';
import columns74Parser from './parsers/columns74.js';
import cards72Parser from './parsers/cards72.js';
import table70Parser from './parsers/table70.js';
import columns75Parser from './parsers/columns75.js';
import columns71Parser from './parsers/columns71.js';
import columns79Parser from './parsers/columns79.js';
import tableStriped77Parser from './parsers/tableStriped77.js';
import columns81Parser from './parsers/columns81.js';
import cards80Parser from './parsers/cards80.js';
import columns84Parser from './parsers/columns84.js';
import columns83Parser from './parsers/columns83.js';
import cards73Parser from './parsers/cards73.js';
import cards60Parser from './parsers/cards60.js';
import columns86Parser from './parsers/columns86.js';
import cardsNoImages85Parser from './parsers/cardsNoImages85.js';
import cards66Parser from './parsers/cards66.js';
import cards88Parser from './parsers/cards88.js';
import accordion90Parser from './parsers/accordion90.js';
import cards89Parser from './parsers/cards89.js';
import columns82Parser from './parsers/columns82.js';
import columns93Parser from './parsers/columns93.js';
import columns94Parser from './parsers/columns94.js';
import tabs87Parser from './parsers/tabs87.js';
import columns91Parser from './parsers/columns91.js';
import columns98Parser from './parsers/columns98.js';
import columns101Parser from './parsers/columns101.js';
import columns97Parser from './parsers/columns97.js';
import cards47Parser from './parsers/cards47.js';
import carousel76Parser from './parsers/carousel76.js';
import carousel92Parser from './parsers/carousel92.js';
import columns96Parser from './parsers/columns96.js';
import cards100Parser from './parsers/cards100.js';
import tabs95Parser from './parsers/tabs95.js';
import cards103Parser from './parsers/cards103.js';
import columns106Parser from './parsers/columns106.js';
import columns108Parser from './parsers/columns108.js';
import accordion114Parser from './parsers/accordion114.js';
import columns110Parser from './parsers/columns110.js';
import cards109Parser from './parsers/cards109.js';
import columns116Parser from './parsers/columns116.js';
import columns117Parser from './parsers/columns117.js';
import hero119Parser from './parsers/hero119.js';
import cards115Parser from './parsers/cards115.js';
import tableStriped99Parser from './parsers/tableStriped99.js';
import tableStriped105Parser from './parsers/tableStriped105.js';
import columns122Parser from './parsers/columns122.js';
import hero121Parser from './parsers/hero121.js';
import cardsNoImages124Parser from './parsers/cardsNoImages124.js';
import accordion127Parser from './parsers/accordion127.js';
import cards102Parser from './parsers/cards102.js';
import columns125Parser from './parsers/columns125.js';
import cards112Parser from './parsers/cards112.js';
import columns129Parser from './parsers/columns129.js';
import cards126Parser from './parsers/cards126.js';
import table123Parser from './parsers/table123.js';
import carousel104Parser from './parsers/carousel104.js';
import columns134Parser from './parsers/columns134.js';
import columns133Parser from './parsers/columns133.js';
import hero131Parser from './parsers/hero131.js';
import table135Parser from './parsers/table135.js';
import columns136Parser from './parsers/columns136.js';
import cards128Parser from './parsers/cards128.js';
import cards130Parser from './parsers/cards130.js';
import columns137Parser from './parsers/columns137.js';
import columns142Parser from './parsers/columns142.js';
import columns140Parser from './parsers/columns140.js';
import columns138Parser from './parsers/columns138.js';
import cardsNoImages139Parser from './parsers/cardsNoImages139.js';
import columns143Parser from './parsers/columns143.js';
import columns141Parser from './parsers/columns141.js';
import hero147Parser from './parsers/hero147.js';
import cards146Parser from './parsers/cards146.js';
import hero148Parser from './parsers/hero148.js';
import columns151Parser from './parsers/columns151.js';
import hero144Parser from './parsers/hero144.js';
import cards113Parser from './parsers/cards113.js';
import columns153Parser from './parsers/columns153.js';
import cards145Parser from './parsers/cards145.js';
import columns149Parser from './parsers/columns149.js';
import columns132Parser from './parsers/columns132.js';
import columns156Parser from './parsers/columns156.js';
import cards155Parser from './parsers/cards155.js';
import columns158Parser from './parsers/columns158.js';
import hero154Parser from './parsers/hero154.js';
import columns162Parser from './parsers/columns162.js';
import table120Parser from './parsers/table120.js';
import columns150Parser from './parsers/columns150.js';
import columns165Parser from './parsers/columns165.js';
import columns152Parser from './parsers/columns152.js';
import tableStriped163Parser from './parsers/tableStriped163.js';
import columns160Parser from './parsers/columns160.js';
import columns157Parser from './parsers/columns157.js';
import cards161Parser from './parsers/cards161.js';
import tableStriped159Parser from './parsers/tableStriped159.js';
import columns170Parser from './parsers/columns170.js';
import cards171Parser from './parsers/cards171.js';
import hero173Parser from './parsers/hero173.js';
import columns168Parser from './parsers/columns168.js';
import columns175Parser from './parsers/columns175.js';
import cards167Parser from './parsers/cards167.js';
import carousel169Parser from './parsers/carousel169.js';
import columns177Parser from './parsers/columns177.js';
import cards176Parser from './parsers/cards176.js';
import cards174Parser from './parsers/cards174.js';
import carousel172Parser from './parsers/carousel172.js';
import tableStriped164Parser from './parsers/tableStriped164.js';
import columns180Parser from './parsers/columns180.js';
import columns182Parser from './parsers/columns182.js';
import cards181Parser from './parsers/cards181.js';
import cards178Parser from './parsers/cards178.js';
import columns186Parser from './parsers/columns186.js';
import cards179Parser from './parsers/cards179.js';
import cardsNoImages184Parser from './parsers/cardsNoImages184.js';
import hero188Parser from './parsers/hero188.js';
import hero183Parser from './parsers/hero183.js';
import columns192Parser from './parsers/columns192.js';
import hero189Parser from './parsers/hero189.js';
import columns190Parser from './parsers/columns190.js';
import columns193Parser from './parsers/columns193.js';
import columns166Parser from './parsers/columns166.js';
import cards194Parser from './parsers/cards194.js';
import columns187Parser from './parsers/columns187.js';
import cards195Parser from './parsers/cards195.js';
import hero191Parser from './parsers/hero191.js';
import columns200Parser from './parsers/columns200.js';
import columns185Parser from './parsers/columns185.js';
import columns197Parser from './parsers/columns197.js';
import accordion199Parser from './parsers/accordion199.js';
import columns198Parser from './parsers/columns198.js';
import columns207Parser from './parsers/columns207.js';
import cards203Parser from './parsers/cards203.js';
import columns202Parser from './parsers/columns202.js';
import accordion208Parser from './parsers/accordion208.js';
import hero204Parser from './parsers/hero204.js';
import cards205Parser from './parsers/cards205.js';
import accordion196Parser from './parsers/accordion196.js';
import columns201Parser from './parsers/columns201.js';
import cards209Parser from './parsers/cards209.js';
import accordion212Parser from './parsers/accordion212.js';
import cardsNoImages210Parser from './parsers/cardsNoImages210.js';
import table206Parser from './parsers/table206.js';
import columns213Parser from './parsers/columns213.js';
import cards211Parser from './parsers/cards211.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  cards8: cards8Parser,
  accordion3: accordion3Parser,
  columns7: columns7Parser,
  columns4: columns4Parser,
  columns5: columns5Parser,
  cards6: cards6Parser,
  accordion10: accordion10Parser,
  cards1: cards1Parser,
  hero13: hero13Parser,
  columns2: columns2Parser,
  tabs9: tabs9Parser,
  columns12: columns12Parser,
  columns16: columns16Parser,
  cards18: cards18Parser,
  cards11: cards11Parser,
  cards19: cards19Parser,
  cards24: cards24Parser,
  cards21: cards21Parser,
  columns30: columns30Parser,
  table26: table26Parser,
  columns32: columns32Parser,
  carousel25: carousel25Parser,
  hero22: hero22Parser,
  columns17: columns17Parser,
  columns36: columns36Parser,
  cards31: cards31Parser,
  cards23: cards23Parser,
  columns14: columns14Parser,
  columns35: columns35Parser,
  cardsNoImages28: cardsNoImages28Parser,
  columns42: columns42Parser,
  columns44: columns44Parser,
  columns38: columns38Parser,
  tabs33: tabs33Parser,
  tableStriped15: tableStriped15Parser,
  columns39: columns39Parser,
  embedVideo46: embedVideo46Parser,
  columns49: columns49Parser,
  tabs50: tabs50Parser,
  embedVideo40: embedVideo40Parser,
  video45: video45Parser,
  cards41: cards41Parser,
  cards51: cards51Parser,
  accordion58: accordion58Parser,
  columns53: columns53Parser,
  accordion59: accordion59Parser,
  cards52: cards52Parser,
  columns61: columns61Parser,
  cards48: cards48Parser,
  cards62: cards62Parser,
  cards57: cards57Parser,
  cards56: cards56Parser,
  cards63: cards63Parser,
  carousel43: carousel43Parser,
  hero65: hero65Parser,
  columns67: columns67Parser,
  columns69: columns69Parser,
  carousel55: carousel55Parser,
  hero68: hero68Parser,
  columns74: columns74Parser,
  cards72: cards72Parser,
  table70: table70Parser,
  columns75: columns75Parser,
  columns71: columns71Parser,
  columns79: columns79Parser,
  tableStriped77: tableStriped77Parser,
  columns81: columns81Parser,
  cards80: cards80Parser,
  columns84: columns84Parser,
  columns83: columns83Parser,
  cards73: cards73Parser,
  cards60: cards60Parser,
  columns86: columns86Parser,
  cardsNoImages85: cardsNoImages85Parser,
  cards66: cards66Parser,
  cards88: cards88Parser,
  accordion90: accordion90Parser,
  cards89: cards89Parser,
  columns82: columns82Parser,
  columns93: columns93Parser,
  columns94: columns94Parser,
  tabs87: tabs87Parser,
  columns91: columns91Parser,
  columns98: columns98Parser,
  columns101: columns101Parser,
  columns97: columns97Parser,
  cards47: cards47Parser,
  carousel76: carousel76Parser,
  carousel92: carousel92Parser,
  columns96: columns96Parser,
  cards100: cards100Parser,
  tabs95: tabs95Parser,
  cards103: cards103Parser,
  columns106: columns106Parser,
  columns108: columns108Parser,
  accordion114: accordion114Parser,
  columns110: columns110Parser,
  cards109: cards109Parser,
  columns116: columns116Parser,
  columns117: columns117Parser,
  hero119: hero119Parser,
  cards115: cards115Parser,
  tableStriped99: tableStriped99Parser,
  tableStriped105: tableStriped105Parser,
  columns122: columns122Parser,
  hero121: hero121Parser,
  cardsNoImages124: cardsNoImages124Parser,
  accordion127: accordion127Parser,
  cards102: cards102Parser,
  columns125: columns125Parser,
  cards112: cards112Parser,
  columns129: columns129Parser,
  cards126: cards126Parser,
  table123: table123Parser,
  carousel104: carousel104Parser,
  columns134: columns134Parser,
  columns133: columns133Parser,
  hero131: hero131Parser,
  table135: table135Parser,
  columns136: columns136Parser,
  cards128: cards128Parser,
  cards130: cards130Parser,
  columns137: columns137Parser,
  columns142: columns142Parser,
  columns140: columns140Parser,
  columns138: columns138Parser,
  cardsNoImages139: cardsNoImages139Parser,
  columns143: columns143Parser,
  columns141: columns141Parser,
  hero147: hero147Parser,
  cards146: cards146Parser,
  hero148: hero148Parser,
  columns151: columns151Parser,
  hero144: hero144Parser,
  cards113: cards113Parser,
  columns153: columns153Parser,
  cards145: cards145Parser,
  columns149: columns149Parser,
  columns132: columns132Parser,
  columns156: columns156Parser,
  cards155: cards155Parser,
  columns158: columns158Parser,
  hero154: hero154Parser,
  columns162: columns162Parser,
  table120: table120Parser,
  columns150: columns150Parser,
  columns165: columns165Parser,
  columns152: columns152Parser,
  tableStriped163: tableStriped163Parser,
  columns160: columns160Parser,
  columns157: columns157Parser,
  cards161: cards161Parser,
  tableStriped159: tableStriped159Parser,
  columns170: columns170Parser,
  cards171: cards171Parser,
  hero173: hero173Parser,
  columns168: columns168Parser,
  columns175: columns175Parser,
  cards167: cards167Parser,
  carousel169: carousel169Parser,
  columns177: columns177Parser,
  cards176: cards176Parser,
  cards174: cards174Parser,
  carousel172: carousel172Parser,
  tableStriped164: tableStriped164Parser,
  columns180: columns180Parser,
  columns182: columns182Parser,
  cards181: cards181Parser,
  cards178: cards178Parser,
  columns186: columns186Parser,
  cards179: cards179Parser,
  cardsNoImages184: cardsNoImages184Parser,
  hero188: hero188Parser,
  hero183: hero183Parser,
  columns192: columns192Parser,
  hero189: hero189Parser,
  columns190: columns190Parser,
  columns193: columns193Parser,
  columns166: columns166Parser,
  cards194: cards194Parser,
  columns187: columns187Parser,
  cards195: cards195Parser,
  hero191: hero191Parser,
  columns200: columns200Parser,
  columns185: columns185Parser,
  columns197: columns197Parser,
  accordion199: accordion199Parser,
  columns198: columns198Parser,
  columns207: columns207Parser,
  cards203: cards203Parser,
  columns202: columns202Parser,
  accordion208: accordion208Parser,
  hero204: hero204Parser,
  cards205: cards205Parser,
  accordion196: accordion196Parser,
  columns201: columns201Parser,
  cards209: cards209Parser,
  accordion212: accordion212Parser,
  cardsNoImages210: cardsNoImages210Parser,
  table206: table206Parser,
  columns213: columns213Parser,
  cards211: cards211Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
