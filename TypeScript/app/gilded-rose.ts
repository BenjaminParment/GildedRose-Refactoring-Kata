export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      switch (true) {
        case this.itemNameContains(item, "Aged Brie"):
          if (item.quality < 50) item.quality++;
          if (item.sellIn < 0 && item.quality < 50) item.quality++;
          break;
        case this.itemNameContains(item, "Backstage passes"):
          if (item.quality < 50) item.quality++;
          if (item.quality < 50 && item.sellIn < 11) item.quality++;
          if (item.quality < 50 && item.sellIn < 6) item.quality++;
          if (item.sellIn <= 0) item.quality = 0;
          break;
        case this.itemNameContains(item, "Conjured"):
          if (item.quality > 0 && item.sellIn > 0) item.quality -= 2;
          if (item.quality > 0 && item.sellIn <= 0) item.quality -= 4;
          if (item.quality < 0) item.quality = 0;
          break;
        case this.itemNameContains(item, "Sulfuras"):
          break;
        default:
          item.sellIn < 0 ? (item.quality -= 2) : item.quality--;
          if (item.quality > 50) item.quality = 50;
          break;
      }
      item.sellIn--;
    }
    return this.items;
  }

  //Returns true if the string pattern is included in the item name
  public itemNameContains(item: Item, contains: string): boolean {
    return item.name.indexOf(contains) >= 0;
  }
}
