'use client';

import { use, useState, useRef, useEffect } from 'react';
import { ShoppingCart, Repeat, ClipboardList, Leaf, MapPin, Info, FileText, ChevronDown } from 'lucide-react';
import Header from "@/components/marketplace/Header";
import Footer from "@/components/Footer";
import CreateCommentBox from '@/components/marketplace/CreateCommentBox';
import CommentsSection from '@/components/marketplace/CommentsSection';
import { CommentsProvider } from '@/context/CommentsContext';
import { useCartStore } from '@/store/cart.store';

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

type AccordionItem = {
    title: string;
    content: string;
};

// Interface atualizada para corresponder ao schema do banco de dados
interface ProductData {
    id: string;
    title: string;
    credit_type: string;
    certification_type: string;
    price: number;
    description: string;
    supply: number;
    batch_discount: number;
    size_batch: number;
    image_ad?: string;
    carousel_images?: string[];
    verified_stamp?: boolean;
    active?: boolean;
    problem?: string;
    solution?: string;
    impact?: string;
    co2_reduction?: number;
    local?: string;
    status: string;
    standard?: string;
    biome?: string;
    project_type?: string;
    sold?: number;
    createdAt: string;
    companyId: string;
    company?: {
        id: string;
        email: string;
    };
    comments?: Comment[];
}

// Adicionar esta interface ou importar do CommentsSection
interface Comment {
    id: string;
    content: string;
    companyId: string;
    adProductId: string;
    createdAt: string;
    company?: {
        name: string;
    };
}

// Create a separate Accordion Item component to use hooks properly
function AccordionItemComponent({ item, index, isOpen, onToggle }: {
    item: AccordionItem;
    index: number;
    isOpen: boolean;
    onToggle: (index: number) => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen]);

    return (
        <div key={index} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <button
                onClick={() => onToggle(index)}
                className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
            >
                <span className="font-semibold text-lg text-[#002E34]">{item.title}</span>
                <ChevronDown
                    className={`w-6 h-6 text-[#002E34] transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
            >
                <div className="px-5 pb-5 pt-2 bg-gray-50 text-gray-700 text-base leading-relaxed border-t border-gray-200">
                    {item.content}
                </div>
            </div>
        </div>
    );
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adProducts/${id}`);

                if (!response.ok) {
                    throw new Error('Erro ao carregar produto');
                }

                const data = await response.json();
                setProductData(data);
            } catch (err) {
                console.error('Erro ao buscar produto:', err);
                setError('Não foi possível carregar o produto');
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleAccordion = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        }
        else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    const handleAddToCart = () => {
        if (!productData) return;

        const itemToAdd = {
            creditId: `CREDIT-${productData.id}`,
            sellerId: productData.companyId || 'SELLER-UNKNOWN',
            quantity: quantity,
            pricePerUnit: productData.price / 100, // Converter de centavos para reais
            productName: productData.title,
        };

        addItem(itemToAdd);
        setQuantity(1);
    };

    // Mostrar loading
    if (loading) {
        return (
            <div className="w-full flex flex-col min-h-screen gap-8" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <Header />
                <div className="flex-1 flex justify-center items-center min-h-[400px]">
                    <p className="text-lg">Carregando produto...</p>
                </div>
                <Footer />
            </div>
        );
    }

    // Mostrar erro
    if (error || !productData) {
        return (
            <div className="w-full flex flex-col min-h-screen gap-8" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <Header />
                <div className="flex-1 flex justify-center items-center min-h-[400px]">
                    <p className="text-lg text-red-500">{error || 'Produto não encontrado'}</p>
                </div>
                <Footer />
            </div>
        );
    }

    // Dados dos cards com informações reais do produto
    const cards = [
        {
            id: 1,
            icon: <Repeat size={24} />,
            text: <>Toneladas de CO<sub>2eq</sub> Compensados</>,
            subText: productData.co2_reduction ? `${productData.co2_reduction} t` : 'N/A'
        },
        {
            id: 2,
            icon: <ClipboardList size={24} />,
            text: 'Tipo de projeto',
            subText: productData.project_type || 'N/A'
        },
        {
            id: 3,
            icon: <Leaf size={24} />,
            text: 'Bioma',
            subText: productData.biome || 'N/A'
        },
        {
            id: 4,
            icon: <MapPin size={24} />,
            text: 'Local',
            subText: productData.local || 'N/A'
        },
        {
            id: 5,
            icon: <Info size={24} />,
            text: 'Status',
            subText: productData.status === 'pending' ? 'Pendente' : productData.status === 'active' ? 'Ativo' : productData.status
        },
        {
            id: 6,
            icon: <FileText size={24} />,
            text: 'Padrão',
            subText: productData.standard || 'N/A'
        },
    ];

    // Processar imagens do carousel - usar carousel_images do banco ou placeholder
    const carouselImages = productData.carousel_images && Array.isArray(productData.carousel_images)
        ? productData.carousel_images
        : [];

    const images = carouselImages.length > 0
        ? carouselImages.map((src: string, idx: number) => ({
            src: src,
            alt: `${productData.title} - Imagem ${idx + 1}`
        }))
        : [
            { src: productData.image_ad || "/images/placeholder.jpg", alt: productData.title },
            { src: "/images/placeholder.jpg", alt: "Imagem 2" },
            { src: "/images/placeholder.jpg", alt: "Imagem 3" },
        ];

    return (
        <div className="w-full flex flex-col min-h-screen gap-8" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
            <Header />

            <div className="flex-1 flex flex-col items-center p-8">
                <div className="relative w-[99%] h-[700px] rounded-2xl overflow-hidden shadow-lg">
                    {/* Imagem de fundo*/}
                    <img
                        src={productData.image_ad || "https://via.placeholder.com/1200x600"}
                        alt={productData.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Texto sobre a imagem */}
                    <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 flex justify-between items-center">
                        {/* Texto */}
                        <div className="bg-black/50 text-white p-4 rounded-lg max-w-md">
                            <h1 className="text-4xl lg:text-7xl font-bold">{productData.title}</h1>
                            <p className="text-sm mt-4">{productData.credit_type}</p>
                            <p className="text-lg mt-2 font-semibold">
                                R$ {(productData.price).toFixed(2)}
                            </p>
                        </div>

                        {/* Botão e Quantidade */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 bg-black/50 rounded-lg p-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded transition"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max={productData.supply}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Math.min(productData.supply, parseInt(e.target.value) || 1)))}
                                    className="w-12 text-center bg-black/30 text-white border-0 rounded"
                                />
                                <button
                                    onClick={() => setQuantity(Math.min(productData.supply, quantity + 1))}
                                    className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded transition"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                style={{ backgroundColor: "rgb(0, 224, 127)" }}
                                className="flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:brightness-90 transition"
                            >
                                <ShoppingCart size={20} />
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Retângulos de dados */}
            <div className="w-full flex justify-center px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-[1200px]">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="flex items-center bg-gray-200 rounded-2xl p-6 w-full max-w-[450px] lg:w-80 h-28"
                        >
                            {/* Ícone */}
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mr-4">
                                {card.icon}
                            </div>

                            {/* Texto */}
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <span className="text-lg font-normal">{card.text}</span>
                                <span className="font-semibold mt-1 text-gray-600">{card.subText}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Carrossel de imagens */}
            <div className="w-full flex flex-col items-center mt-10 mb-8">
                <h2 className="text-3xl font-bold text-[#002E34] mb-8">Fotos do Projeto</h2>

                <div className="relative w-full max-w-3xl px-4 overflow-visible">
                    {/* Imagem Principal do Carousel */}
                    <div className="relative w-full h-[500px] bg-gray-100 rounded-2xl overflow-hidden shadow-xl group">
                        <img
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt}
                            className="w-full h-full object-contain"
                        />

                        {/* Botões de Navegação */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                    disabled={currentIndex === 0}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))}
                                    disabled={currentIndex === images.length - 1}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Contador de imagens */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Miniaturas */}
                    {images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-6 overflow-x-auto px-2 pt-2 pb-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                        idx === currentIndex
                                            ? 'border-[#002E34] scale-110 shadow-lg'
                                            : 'border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100'
                                    }`}
                                    style={{ transformOrigin: 'center top' }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Descrição detalhada do produto */}
            <div className="w-full flex justify-center px-4 mt-7 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full">
                    <h2 className="text-3xl font-bold text-[#002E34] mb-6 text-center">
                        Sobre o Projeto
                    </h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line text-justify">
                            {productData.description || 'Descrição não disponível.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* "Conheça melhor" */}
            <div className="w-full flex justify-center px-4 mt-8 mb-7">
                <div className="max-w-4xl w-full">
                    <h2 className="text-3xl font-bold text-[#002E34] mb-8 text-center">
                        Conheça Melhor
                    </h2>

                    <div className="space-y-3">
                        {[
                            { title: "O problema", content: productData.problem || "Informação não disponível" },
                            { title: "A solução do produto", content: productData.solution || "Informação não disponível" },
                            { title: "Impacto gerado", content: productData.impact || "Informação não disponível" },
                        ].map((item, index) => (
                            <AccordionItemComponent
                                key={index}
                                item={item}
                                index={index}
                                isOpen={openIndexes.includes(index)}
                                onToggle={toggleAccordion}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Seção de Comentários */}
            <CommentsProvider adProductId={id}>
                <div className="w-full flex flex-col items-center px-4 mb-16">
                    <div className="max-w-4xl w-full">
                        <h2 className="text-3xl font-bold text-[#002E34] mb-8 text-center">
                            Deixe seu comentário
                        </h2>

                        <div className="mb-8">
                            <CreateCommentBox />
                        </div>

                        <CommentsSection />
                    </div>
                </div>
            </CommentsProvider>

            <Footer />
        </div>
    );
}