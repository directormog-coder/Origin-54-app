export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Product Detail: {id}</h1>
    </div>
  );
}
0

