// export async function getProducts() {
//     const res = await fetch("/api/products");
//     if (!res.ok) {
//         throw new Error("Failed to fetch products");
//     }
//     return res.json();
// }

export async function deleteProduct(productId: string) {
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete product");
    }
    return res.json();
}