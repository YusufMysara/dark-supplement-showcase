import { MessageCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface WhatsAppButtonProps {
  productName: string;
  productPrice: number;
  productUrl: string;
  phoneNumber?: string;
}

const WhatsAppButton = ({ productName, productPrice, productUrl, phoneNumber = "+201120011390" }: WhatsAppButtonProps) => {
  const { t } = useTranslation();
  const message = `Hello, I want to order: ${productName} - ${productUrl}`;
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 font-display text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{t("products.orderWhatsApp")}</span>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("products.orderWhatsApp")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
