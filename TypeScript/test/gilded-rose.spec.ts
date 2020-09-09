import { GildedRose, Item } from "../app/gilded-rose";

import { expect } from "chai";

describe("Gilded Rose", () => {
  describe("Aged Brie", () => {
    it("should increase in quality if it is under 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal("Aged Brie");
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(41);
    });

    it("should not increase in quality if it is over or equal to 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal("Aged Brie");
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(50);
    });

    it("should increase twice as fast when the sellIn is 0", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", -1, 45)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal("Aged Brie");
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(47);
    });
  });

  describe("Backstage passes", () => {
    it("should increase by 1 in quality if it is under 50 and sellIn is above 10", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(41);
    });

    it("should increase by 2 in quality if it is under 50 and sellIn is between 5 and 10 days", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(42);
    });

    it("should increase by 3 in quality if it is under 50 and sellIn is less than 6 days", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(43);
    });

    it("should reset quality to 0 when sellIn is negative", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(0);
    });

    it("should not increase quality if at 50", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("should never change in quality", () => {
      const gildedRose = new GildedRose([new Item("Sulfuras", 5, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(80);
    });
  });

  describe("Conjured items", () => {
    it("should degrade quality two times faster", () => {
      const gildedRose = new GildedRose([
        new Item("Conjured something", 10, 35),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(33);
    });

    it("should degrade quality four times if sellIn is under 0", () => {
      const gildedRose = new GildedRose([
        new Item("Conjured something", -1, 35),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(31);
    });

    it("should degrade quality by 1 if prone to become negative", () => {
      const gildedRose = new GildedRose([
        new Item("Conjured something", 10, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(0);
    });

    it("should not degrade if quality is at 0", () => {
      const gildedRose = new GildedRose([
        new Item("Conjured something", 10, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe("Random items", () => {
    it("should lose one quality if sellIn is bigger than 0", () => {
      const gildedRose = new GildedRose([new Item("Random", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(9);
    });

    it("should lose two quality if sellIn is smaller than 0", () => {
      const gildedRose = new GildedRose([new Item("Random", -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(8);
    });
  });
});
