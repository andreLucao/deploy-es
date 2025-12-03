import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface CertificateData {
  orderNumber: string;
  companyName: string;
  creditsBought: number;
  productTitle: string;
  creditType: string;
  certificationType: string;
  amount: number;
  purchaseDate: string;
  productDetails?: {
    co2Reduction?: number | null;
    location?: string | null;
    biome?: string | null;
    standard?: string | null;
    projectType?: string | null;
  };
}

const createCertificateHTML = (data: CertificateData): string => {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="color-scheme" content="light">
      <style>
        html, body, * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          background: transparent;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .certificate {
          width: 210mm;
          height: 297mm;
          background: linear-gradient(135deg, #f7f3e8 0%, #f5f1e6 100%);
          padding: 40px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 3px double #1e8449;
        }

        .certificate::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          border: 1px solid #1e8449;
          pointer-events: none;
          z-index: 0;
        }

        .certificate-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .badge {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
        }

        .badge img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .title {
          font-size: 48px;
          font-weight: bold;
          color: #1e8449;
          letter-spacing: 2px;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .subtitle {
          font-size: 18px;
          color: #00e07f;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        .divider {
          width: 200px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00e07f, transparent);
          margin: 0 auto;
        }

        .attestation {
          text-align: center;
          margin: 30px 0;
          font-size: 18px;
          color: #666;
          letter-spacing: 1px;
        }

        .company-name {
          text-align: center;
          font-size: 40px;
          font-weight: bold;
          color: #1a1a1a;
          margin: 15px 0 30px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .quantity-section {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background: rgba(0, 224, 127, 0.05);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .quantity-number {
          font-size: 80px;
          font-weight: bold;
          color: #00e07f;
          line-height: 1;
          margin-bottom: 25px;
        }

        .quantity-label {
          font-size: 24px;
          font-weight: bold;
          color: #00e07f;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .quantity-description {
          font-size: 14px;
          color: #666;
          font-style: italic;
        }

        .details-section {
          border-top: 1px solid #ddd;
          padding: 20px 0;
          margin: 30px 0 30px 0;
        }

        .section-title {
          font-size: 16px;
          font-weight: bold;
          color: #1e8449;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
          text-align: center;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          font-size: 14px;
          color: #444;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
        }

        .detail-label {
          font-weight: bold;
          color: #1e8449;
        }

        .detail-value {
          color: #00e07f;
          font-weight: 600;
        }

        .project-details {
          margin: 20px 0;
          font-size: 12px;
          color: #444;
        }

        .project-title {
          font-size: 13px;
          font-weight: bold;
          color: #1e8449;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .project-detail {
          margin: 5px 0;
          padding-left: 15px;
        }

        .project-detail::before {
          content: '•';
          margin-right: 8px;
          color: #00e07f;
          font-weight: bold;
        }

        .footer {
          text-align: center;
          border-top: 1px solid #ddd;
          padding-top: 10px;
          font-size: 12px;
          color: #999;
        }

        .footer-company {
          font-size: 14px;
          font-weight: bold;
          color: #00e07f;
          margin-bottom: 8px;
        }

        .footer-info {
          font-size: 11px;
          color: #999;
          margin-top: 3px;
        }

        .statement {
          font-size: 11px;
          color: #888;
          font-style: italic;
          margin-bottom: 8px;
          margin-top: 8px;
          line-height: 1.4;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="certificate-content">
          <!-- Header -->
          <div class="header">
            <div class="badge">
              <img src="/imgs/Logo.png" alt="EcoChange Logo" />
            </div>
            <div class="title">Certificado de Compra</div>
            <div class="subtitle">de Créditos de Carbono</div>
            <div class="divider"></div>
          </div>

          <!-- Main Content -->
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <div class="attestation">ATESTAMOS QUE</div>

            <div class="company-name">${data.companyName.toUpperCase()}</div>

            <div class="attestation">COMPROU</div>
          
            <div class="quantity-section">
              <div class="quantity-number">${data.creditsBought}</div>
              <div class="quantity-label">CRÉDITOS DE CARBONO</div>
              <div class="quantity-description">equivalente a ${data.creditsBought} toneladas de CO₂ evitadas</div>
            </div>

            <div class="details-section">
              <div class="section-title">Detalhes da Compra</div>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Produto:</span>
                  <span class="detail-value">${data.productTitle}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Tipo:</span>
                  <span class="detail-value">${data.creditType}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Certificação:</span>
                  <span class="detail-value">${data.certificationType}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Valor:</span>
                  <span class="detail-value">R$ ${(data.amount / 100).toFixed(2)}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Data:</span>
                  <span class="detail-value">${data.purchaseDate}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">ID:</span>
                  <span class="detail-value">${data.orderNumber}</span>
                </div>
              </div>
            </div>

            ${data.productDetails?.co2Reduction || data.productDetails?.location || data.productDetails?.biome || data.productDetails?.standard ? `
              <div class="project-details">
                <div class="project-title">Detalhes do Projeto</div>
                ${data.productDetails?.co2Reduction ? `<div class="project-detail">Redução de CO₂: ${data.productDetails.co2Reduction.toFixed(2)} toneladas</div>` : ''}
                ${data.productDetails?.location ? `<div class="project-detail">Localização: ${data.productDetails.location}</div>` : ''}
                ${data.productDetails?.biome ? `<div class="project-detail">Bioma: ${data.productDetails.biome}</div>` : ''}
                ${data.productDetails?.standard ? `<div class="project-detail">Padrão: ${data.productDetails.standard}</div>` : ''}
                ${data.productDetails?.projectType ? `<div class="project-detail">Tipo de Projeto: ${data.productDetails.projectType}</div>` : ''}
              </div>
            ` : ''}
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-company">EcoChange</div>
            <div>Marketplace de Créditos de Carbono</div>
            <div class="statement">Este certificado atesta a compra legítima de créditos de carbono conforme padrões internacionais de compensação ambiental.</div>
            <div class="footer-info">Emitido em: ${new Date().toLocaleDateString('pt-BR')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const downloadCertificate = async (data: CertificateData) => {
  try {
    // Create an iframe to isolate styles completely
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-10000px';
    iframe.style.top = '-10000px';
    iframe.style.width = '210mm';
    iframe.style.height = 'auto';
    iframe.style.border = 'none';

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      document.body.removeChild(iframe);
      throw new Error('Could not access iframe document');
    }

    // Write HTML directly to iframe (prevents style inheritance)
    iframeDoc.open();
    iframeDoc.write(createCertificateHTML(data));
    iframeDoc.close();

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get the certificate element and adjust iframe height
    const certificateElement = iframeDoc.querySelector('.certificate') as HTMLElement;
    if (!certificateElement) {
      document.body.removeChild(iframe);
      throw new Error('Certificate element not found');
    }

    // Set iframe height to A4 height (297mm ≈ 1123px)
    const a4HeightPx = 1123;
    iframe.style.height = a4HeightPx + 'px';

    // Wait a bit more for layout to settle
    await new Promise(resolve => setTimeout(resolve, 300));

    // Convert to canvas with proper dimensions
    const canvas = await html2canvas(certificateElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#f7f3e8',
      allowTaint: true,
      imageTimeout: 5000,
      windowHeight: a4HeightPx,
      windowWidth: 794, // 210mm width
      height: a4HeightPx,
      width: 794,
    });

    // Create PDF from canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Add image to fill the A4 page exactly
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

    // Create a blob from the PDF and open in new tab
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');

    // Clean up
    document.body.removeChild(iframe);
  } catch (error) {
    console.error('Erro ao gerar certificado:', error);
    throw error;
  }
};
