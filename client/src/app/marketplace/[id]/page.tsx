'use client';

import { use, useState, useRef, useEffect } from 'react';
import { ShoppingCart, Repeat, ClipboardList, Leaf, MapPin, Info, FileText, ChevronDown } from 'lucide-react';
import Header from "@/components/marketplace/Header";
import Footer from "@/components/Footer";
import CreateCommentBox from '@/components/marketplace/CreateCommentBox';
import CommentsSection from '@/components/marketplace/CommentsSection';

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

type AccordionItem = {
    title: string;
    content: string;
};

const accordionData: AccordionItem[] = [
    { title: "O problema", content: "Conteúdo" },
    { title: "A solução do produto", content: "Conteúdo" },
    { title: "Impacto gerado", content: "Conteúdo" },
];

// Adicione esta interface após as outras interfaces (linha 22)
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
    carousel_images?: any;
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

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(true);

    // Função para buscar comentários
    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const response = await fetch(`http://API_URL/api/comments/get-ad-comments?adProductId=${id}`);
            
            if (!response.ok) {
                throw new Error('Erro ao carregar comentários');
            }
            
            const data = await response.json();
            setComments(data.comments || []);
        } catch (err) {
            console.error('Erro ao carregar comentários:', err);
        } finally {
            setLoadingComments(false);
        }
    };

    // Carregar comentários quando o componente monta
    useEffect(() => {
        fetchComments();
    }, [id]);

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetch(`http://API_URL/api/adProducts/${id}`);
            const data = await response.json();
            setProductData(data);
        };
        fetchProductData();
    }, [id]);

    const cards = [
        { id: 1, icon: <Repeat size={24} />, text: <>Toneladas de CO<sub>2eq</sub> Compensados</>, subText: 'Quantidade' },
        { id: 2, icon: <ClipboardList size={24} />, text: 'Tipo de projeto', subText: 'Reflorestamento' },
        { id: 3, icon: <Leaf size={24} />, text: 'Bioma', subText: 'Mata Atlântica' },
        { id: 4, icon: <MapPin size={24} />, text: 'Local', subText: 'São Paulo' },
        { id: 5, icon: <Info size={24} />, text: 'Status', subText: 'Ativo' },
        { id: 6, icon: <FileText size={24} />, text: 'Padrão', subText: 'X'},
    ];

    const images = [
        { src: "/images/placeholder.jpg", alt: "Imagem 1" },
        { src: "/images/placeholder.jpg", alt: "Imagem 2" },
        { src: "/images/placeholder.jpg", alt: "Imagem 3" },
        { src: "/images/placeholder.jpg", alt: "Imagem 4" },
        { src: "/images/placeholder.jpg", alt: "Imagem 5" },
        { src: "/images/placeholder.jpg", alt: "Imagem 6" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Sempre que desligar a transição, reativa logo depois (hack p/ suavizar)
    useEffect(() => {
        if (!isTransitioning) {
        const timeout = setTimeout(() => setIsTransitioning(true), 50);
        return () => clearTimeout(timeout);
        }
    }, [isTransitioning]);

    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleAccordion = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } 
        else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return (
        <div className="w-full flex flex-col min-h-screen gap-8 overflow-hidden" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
            <Header />

            <div className="flex flex-col items-center p-8">
                <div className="relative w-[99%] h-[700px] rounded-2xl overflow-hidden shadow-lg">
                    {/* Imagem de fundo*/}
                    <img
                        src="https://via.placeholder.com/1200x600"
                        alt={`Imagem produto ${id}`}
                        className="w-full h-full object-cover"
                    />

                    {/* Texto sobre a imagem */}
                    <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 flex justify-between items-center">
                        {/* Texto */}
                        <div className="bg-black/50 text-white p-4 rounded-lg max-w-md">
                            <h1 className="text-4xl lg:text-7xl font-bold">Produto {id}</h1>
                            <p className="text-sm mt-4">X Créditos de carbono</p>
                        </div>

                        {/* Botão */}
                        <button
                        style={{ backgroundColor: "rgb(0, 224, 127)" }}
                        className="flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:brightness-90"
                        >
                        <ShoppingCart size={20} />
                        Comprar
                        </button>
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
            <div className="w-full flex flex-col items-center mt-10">
                <div className="flex flex-col items-center w-[90%] max-w-4xl">
                    <div
                    className={`flex transition-transform duration-500 ease-in-out`}
                    style={{
                        transform: `translateX(calc(-${currentIndex * 70}% + 15%))`, 
                    }}
                    >
                    {images.map((img, idx) => (
                        <div
                        key={idx}
                        className="min-w-[70%] flex-shrink-0 px-2" 
                        >
                        <div className="aspect-square w-full">
                            <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover rounded-xl shadow-xl
                            transform transition-transform duration-300 ease-in-out
                            hover:scale-105"
                            />
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                    {/* Botão anterior */}
                    <button
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    className="text-2xl px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                    &lt;
                    </button>

                    {/* Bolinhas */}
                    <div className="flex gap-2">
                    {images.map((_, idx) => (
                        <span
                        key={idx}
                        className={`w-3 h-3 rounded-full ${
                            idx === currentIndex ? "bg-gray-800" : "bg-gray-400"
                        }`}
                        ></span>
                    ))}
                    </div>

                    {/* Botão próximo */}
                    <button
                    onClick={() =>
                        setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))
                    }
                    className="text-2xl px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                    &gt;
                    </button>
                </div>
            </div>

            {/* Descrição detalhada do produto */}
            <div className="p-8 space-y-4 mt-10">
                <span className="block">Descrição detalhada do produto</span>
            </div>

            {/* "Conheça melhor" */}
            <div className="p-8 space-y-6 mt-6">
                <h1 className="text-4xl font-bold flex flex-col items-center justify-center">Conheça melhor</h1>

                <div className="max-w-md mx-auto mt-8 space-y-4">
                    {accordionData.map((item, index) => {
                        const contentRef = useRef<HTMLDivElement>(null);
                        const [maxHeight, setMaxHeight] = useState("0px");
                        const isOpen = openIndexes.includes(index);

                        useEffect(() => {
                        if (contentRef.current) {
                            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
                        }
                        }, [isOpen]);

                        return (
                        <div key={index} className="border rounded-2xl shadow">
                            <div
                            className="p-4 flex justify-between items-center cursor-pointer bg-white rounded-t-2xl"
                            onClick={() => toggleAccordion(index)}
                            >
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <ChevronDown
                                className={`w-6 h-6 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                                }`}
                            />
                            </div>
                            <div
                            ref={contentRef}
                            style={{ maxHeight }}
                            className="overflow-hidden transition-max-height duration-500 ease-in-out border-t bg-gray-50 rounded-b-2xl"
                            >
                            <div className="p-4 text-gray-700">{item.content}</div>
                            </div>
                        </div>
                        );
                    })}
                </div>

                <div className="mt-10 flex justify-center items-center"> 
                    <h1 className="text-4xl font-bold">Deixe seu comentário</h1>
                </div>

                <div className="mt-10 flex justify-center items-center"> 
                    <CreateCommentBox 
                    adProductId={id}
                    onCommentAdded={fetchComments} // Passar função para recarregar comentários
                    />
                </div>

                <div className="mt-10 flex justify-center items-center"> 
                    <CommentsSection 
                    adProductId={id}
                    />
                </div>
            </div>

            <Footer />
        </div>    
    );
}