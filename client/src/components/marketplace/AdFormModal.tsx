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
    image_url: "",
    supply: 0,
    batch_discount: 0,
    size_batch: 0,
    verified_stamp: false,
    companyId: "", // Temporário 
    active: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Controlar animações de entrada e saída
  useEffect(() => {
    if (isOpen) {
      const fetchCompanyData = async () => {

        try {
          console.log("Fetching company data...");
          const response = await fetch("http://localhost:3001/api/auth/me", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("Response status:", response.status);
          console.log("Response headers:", [...response.headers.entries()]);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response:", errorText);
            throw new Error(`Falha ao obter dados da empresa (${response.status}): ${errorText}`);
          }
          
          const data = await response.json();
          console.log("Company data:", data);
          setFormData(prev => ({ ...prev, companyId: data.user.id }));
        } catch (err) {
          console.error("Fetch error:", err);
          setError('Não foi possível encontrar o ID da empresa. Por favor, faça login novamente.');
        }
      };

      fetchCompanyData();
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
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

      setFormData({
        title: "",
        credit_type: "",
        certification_type: "",
        price: 0,
        description: "",
        image_url: "",
        supply: 0,
        batch_discount: 0,
        size_batch: 0,
        verified_stamp: false,
        companyId: "",
        active: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar anúncio");
    } finally {
      setIsLoading(false);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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

          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              URL da Imagem
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E34] transition-colors duration-150"
            />
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
