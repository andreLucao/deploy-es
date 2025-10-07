"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AdFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AdFormModal({
  isOpen,
  onClose,
  onSuccess,
}: AdFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    credit_type: "",
    certification_type: "",
    price: 0,
    description: "",
    image_ad: "",
    carousel_images: [] as string[],
    supply: 0,
    batch_discount: 0,
    size_batch: 0,
    verified_stamp: false,
    active: true,
    problem: "",
    solution: "",
    impact: "",
    co2_reduction: 0,
    local: "",
    status: "pending",
    standard: "",
    biome: "",
    project_type: "",
    companyId: "052bb7f7-6fb3-4028-83b8-fe61a0814537", // Temporário - será preenchido automaticamente
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [carouselPreviews, setCarouselPreviews] = useState<string[]>([]);

  // Controlar animações de entrada e saída e buscar companyId
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);


  // Limpar URLs dos blobs quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (formData.image_ad && formData.image_ad.startsWith('blob:')) {
        URL.revokeObjectURL(formData.image_ad);
      }
      if (Array.isArray(formData.carousel_images)) {
        formData.carousel_images.forEach((url: string) => {
          if (url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
      }
    };
  }, [formData.image_ad, formData.carousel_images]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      // Limpar URLs dos blobs para evitar vazamentos de memória
      if (formData.image_ad && formData.image_ad.startsWith('blob:')) {
        URL.revokeObjectURL(formData.image_ad);
      }
      if (Array.isArray(formData.carousel_images)) {
        formData.carousel_images.forEach((url: string) => {
          if (url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
      }
      onClose();
    }, 200); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/adProducts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar anúncio");
      }

      const newAdProduct = await response.json();
      console.log("Anúncio criado:", newAdProduct);

      onSuccess?.();
      handleClose();

      // Reset do formulário
      setFormData({
        title: "",
        credit_type: "",
        certification_type: "",
        price: 0,
        description: "",
        image_ad: "",
        carousel_images: [] as string[],
        supply: 0,
        batch_discount: 0,
        size_batch: 0,
        verified_stamp: false,
        active: true,
        problem: "",
        solution: "",
        impact: "",
        co2_reduction: 0,
        local: "",
        status: "pending",
        standard: "",
        biome: "",
        project_type: "",
        companyId: "052bb7f7-6fb3-4028-83b8-fe61a0814537",
      });
      
      // Limpar estados da imagem
      setSelectedImage(null);
      setImagePreview(null);
      setCarouselImages([]);
      setCarouselPreviews([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar anúncio");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB.');
        return;
      }

      setSelectedImage(file);
      setError(null);

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Converter para blob e gerar URL
      const blob = new Blob([file], { type: file.type });
      const imageUrl = URL.createObjectURL(blob);
      
      setFormData((prev) => ({
        ...prev,
        image_ad: imageUrl,
      }));
    }
  };

  const handleCarouselImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Validar quantidade máxima
    if (files.length > 6) {
      setError('Você pode selecionar no máximo 6 imagens para o carrossel.');
      return;
    }

    // Validar cada arquivo
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Cada imagem deve ter no máximo 5MB.');
        return;
      }
    }

    setCarouselImages(files);
    setError(null);

    // Criar previews das imagens
    const previewPromises = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then((previews) => {
      setCarouselPreviews(previews);
    });

    // Converter para blobs e gerar URLs
    const imageUrls = files.map((file) => {
      const blob = new Blob([file], { type: file.type });
      return URL.createObjectURL(blob);
    });

    setFormData((prev) => ({
      ...prev,
      carousel_images: imageUrls,
    }));
  };

  const removeCarouselImage = (index: number) => {
    const newImages = carouselImages.filter((_, i) => i !== index);
    const newPreviews = carouselPreviews.filter((_, i) => i !== index);
    
    setCarouselImages(newImages);
    setCarouselPreviews(newPreviews);

    // Regenerar URLs dos blobs
    const newUrls = newImages.map((file) => {
      const blob = new Blob([file], { type: file.type });
      return URL.createObjectURL(blob);
    });

    setFormData((prev) => ({
      ...prev,
      carousel_images: newUrls,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pt-20">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${
          isVisible ? "opacity-40" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#002E34]">
            Criar Novo Anúncio
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-150"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="credit_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Crédito *
              </label>
              <input
                type="text"
                id="credit_type"
                name="credit_type"
                value={formData.credit_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="certification_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Certificação *
              </label>
              <input
                type="text"
                id="certification_type"
                name="certification_type"
                value={formData.certification_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preço *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="supply"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantidade Disponível *
              </label>
              <input
                type="number"
                id="supply"
                name="supply"
                value={formData.supply}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="size_batch"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tamanho do Lote *
              </label>
              <input
                type="number"
                id="size_batch"
                name="size_batch"
                value={formData.size_batch}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="batch_discount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Desconto por Lote (%)
            </label>
            <input
              type="number"
              id="batch_discount"
              name="batch_discount"
              value={formData.batch_discount}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
            />
          </div>

          {/* Imagem Principal */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#002E34] transition-colors duration-200">
            <label
              htmlFor="image_ad"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Imagem Principal *
            </label>
            
            {!imagePreview ? (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-4">Clique para selecionar uma imagem</p>
                <input
                  type="file"
                  id="image_ad"
                  name="image_ad"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image_ad"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002E34] cursor-pointer"
                >
                  Selecionar Imagem
                </label>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview da imagem principal"
                    className="w-full max-w-md mx-auto h-64 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image_ad: "" }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                {selectedImage && (
                  <p className="text-sm text-green-600 mt-2 text-center">
                    ✓ {selectedImage.name}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Imagens do Carrossel */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#002E34] transition-colors duration-200">
            <label
              htmlFor="carousel_images"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Imagens do Carrossel (máximo 6)
            </label>
            
            {carouselPreviews.length === 0 ? (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-4">Selecione até 6 imagens para o carrossel</p>
                <input
                  type="file"
                  id="carousel_images"
                  name="carousel_images"
                  accept="image/*"
                  multiple
                  onChange={handleCarouselImagesChange}
                  className="hidden"
                />
                <label
                  htmlFor="carousel_images"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002E34] cursor-pointer"
                >
                  Selecionar Imagens
                </label>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {carouselPreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview carrossel ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeCarouselImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-green-600 text-center">
                  ✓ {carouselImages.length} imagem(ns) selecionada(s)
                </p>
                <div className="mt-4 text-center">
                  <input
                    type="file"
                    id="carousel_images"
                    name="carousel_images"
                    accept="image/*"
                    multiple
                    onChange={handleCarouselImagesChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="carousel_images"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#002E34] cursor-pointer"
                  >
                    Adicionar Mais Imagens
                  </label>
                </div>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="problem"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Problema
            </label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="solution"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Solução
            </label>
            <textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="impact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Impacto
            </label>
            <textarea
              id="impact"
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="co2_reduction"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Redução de CO2 (toneladas)
              </label>
              <input
                type="number"
                id="co2_reduction"
                name="co2_reduction"
                value={formData.co2_reduction}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="local"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Local
              </label>
              <input
                type="text"
                id="local"
                name="local"
                value={formData.local}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="standard"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Padrão
              </label>
              <input
                type="text"
                id="standard"
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="biome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bioma
              </label>
              <input
                type="text"
                id="biome"
                name="biome"
                value={formData.biome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="project_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Projeto
              </label>
              <input
                type="text"
                id="project_type"
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="verified_stamp"
              name="verified_stamp"
              checked={formData.verified_stamp}
              onChange={handleChange}
              className="mr-2"
            />
            <label
              htmlFor="verified_stamp"
              className="text-sm font-medium text-gray-700"
            >
              Selo de Verificação
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#002E34] text-white rounded-md hover:bg-[#004443] disabled:opacity-50 transition-colors duration-150"
            >
              {isLoading ? "Criando..." : "Criar Anúncio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
