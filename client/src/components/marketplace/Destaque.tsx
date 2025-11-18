import Link from "next/link";

async function getFeaturedAds() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const url = `${apiUrl}/api/adProducts/featured?limit=4`;
    const res = await fetch(url, {
      cache: 'no-store'
    });
    if (!res.ok) {
      console.error("Erro ao buscar destaques:", res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Fetch dos destaques falhou:", error);
    return [];
  }
}

export default async function Destaque() {
  const featuredAds = await getFeaturedAds();

  if (!featuredAds || featuredAds.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <p>Não foi possível carregar os destaques no momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

        {featuredAds.map((ad: any) => (
          <Link
            href={`/marketplace/${ad.id}`}
            key={ad.id}
          >
            <div 
              className="h-48 sm:h-56 lg:h-100 w-full rounded-lg hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-xl relative bg-cover bg-center bg-no-repeat overflow-hidden"
              style={{ backgroundImage: `url(${ad.image_ad})` }}
            >
              
              <div className="relative h-full w-full p-4 lg:p-6 flex flex-col items-start justify-end text-base lg:text-lg font-semibold text-white bg-gradient-to-t from-black/100 to-transparent to-50%">

                <span>{ad.title}</span>
                <span className="text-sm font-medium text-neutral-200 mt-2">
                  Por: {ad.company.name}
                </span>
                <span className="text-lg font-bold text-green-600 mt-4">
                  R$ {(ad.price / 100).toFixed(2).replace('.', ',')}
                </span>

              </div>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
}