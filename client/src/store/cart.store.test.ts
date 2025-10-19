import { useCartStore } from "./cart.store";

const MOCK_ITEM_A = {
   creditId: "CRD-123",
   sellerId: "SELLER-XYZ",
   quantity: 100,
   pricePerUnit: 10.0,
};

const MOCK_ITEM_B = {
   creditId: "CRD-456",
   sellerId: "SELLER-XYZ",
   quantity: 50,
   pricePerUnit: 20.0,
};

describe("Cart Store Functionality", () => {
   beforeEach(() => {
      useCartStore.getState().clearCart();
   });

   it("should add a new item to the cart and have a item", () => {
      useCartStore.getState().addItem(MOCK_ITEM_A);

      const items = useCartStore.getState().items;

      expect(items.length).toBe(1);
   });

   it("should add a new item to the cart and confirm the item (with quantity)", () => {
      useCartStore.getState().addItem(MOCK_ITEM_A);

      const items = useCartStore.getState().items;

      expect(items[0].quantity).toBe(100);
   });

   it("should increase the quantity if the item already exists and maintain the items quantity", () => {
      useCartStore.getState().addItem(MOCK_ITEM_A);
      useCartStore.getState().addItem(MOCK_ITEM_A);
      const items = useCartStore.getState().items;

      expect(items.length).toBe(1);
   });

   it("should increase quantity if the item already exists and double its quantity", () => {
      useCartStore.getState().addItem(MOCK_ITEM_A);
      useCartStore.getState().addItem(MOCK_ITEM_A);
      const items = useCartStore.getState().items;

      expect(items[0].quantity).toBe(200);
   });

   it("should correctly calculate the total price", () => {
      useCartStore.getState().addItem(MOCK_ITEM_A); // R$ 1000,00
      useCartStore.getState().addItem(MOCK_ITEM_B); // R$ 1000,00

      const totalPrice = useCartStore.getState().getTotalPrice();

      expect(totalPrice).toBe(2000.0);
   });

   it("should decrease item quantity by one and maintain the item", () => {
      useCartStore.getState().addItem({ ...MOCK_ITEM_A, quantity: 5 });

      useCartStore.getState().decreaseQuantity(MOCK_ITEM_A.creditId);

      const items = useCartStore.getState().items;

      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(4);
   });

   it("should remove item completely if quantity drops to zero or below", () => {
      useCartStore.getState().addItem({ ...MOCK_ITEM_A, quantity: 1 });

      useCartStore.getState().decreaseQuantity(MOCK_ITEM_A.creditId);

      const items = useCartStore.getState().items;

      expect(items.length).toBe(0);
   });

   it("should increase item quantity by one", () => {
      useCartStore.getState().addItem(MOCK_ITEM_A);

      useCartStore.getState().increaseQuantity(MOCK_ITEM_A.creditId);

      const items = useCartStore.getState().items;

      expect(items[0].quantity).toBe(101);
   });
});
