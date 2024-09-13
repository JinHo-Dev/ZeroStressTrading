import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: { params: { tradeName: string } }) {
  return {
    tradeName: params.tradeName,
    itemId: 1,
    itemName: "A",
  };
}

export default function Trade() {
  const { tradeName, itemName, itemId } = useLoaderData<typeof loader>();
  return (
    <>
      <div>{tradeName}</div>
    </>
  );
}
