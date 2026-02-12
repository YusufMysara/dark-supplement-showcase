import { MessageCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WhatsAppButtonProps {
  productName: string;
  productPrice: number;
  productUrl: string;
  phoneNumber?: string;
}

const WhatsAppButton = ({ productName, productPrice, productUrl, phoneNumber = "+201234567890" }: WhatsAppButtonProps) => {
  const message = `Hi, I'm interested in this product. Please share more details.\n\nProduct: ${productName}\nPrice: ${productPrice} EGP\nLink: ${productUrl}`;
  
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
            <span>Chat on WhatsApp</span>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
