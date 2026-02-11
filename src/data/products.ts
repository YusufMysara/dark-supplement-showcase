import productProtein from "@/assets/product-protein.jpg";
import productPreworkout from "@/assets/product-preworkout.jpg";
import productBcaa from "@/assets/product-bcaa.jpg";
import productCreatine from "@/assets/product-creatine.jpg";
import productVitamins from "@/assets/product-vitamins.jpg";
import productOmega from "@/assets/product-omega.jpg";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  onSale: boolean;
  description: string;
  ingredients: string[];
  nutritionFacts: { label: string; value: string }[];
}

export const allProducts: Product[] = [
  {
    id: 1, name: "Whey Isolate Pro", category: "Whey Protein", price: 54.99, image: productProtein,
    rating: 4.8, reviews: 342, inStock: true, onSale: false,
    description: "Ultra-pure whey isolate with 27g protein per serving. Cold-processed to preserve bioactive fractions and maximize absorption. Mixes instantly with no clumps — perfect post-workout or any time you need a clean protein boost.",
    ingredients: ["Whey Protein Isolate", "Natural & Artificial Flavors", "Soy Lecithin", "Sucralose", "Acesulfame Potassium"],
    nutritionFacts: [
      { label: "Calories", value: "120" }, { label: "Protein", value: "27g" }, { label: "Total Fat", value: "0.5g" },
      { label: "Cholesterol", value: "5mg" }, { label: "Sodium", value: "160mg" }, { label: "Total Carbs", value: "2g" },
      { label: "Sugars", value: "1g" }, { label: "Calcium", value: "120mg" },
    ],
  },
  {
    id: 2, name: "Ignite Pre-Workout", category: "Amino", price: 29.99, originalPrice: 39.99, image: productPreworkout,
    rating: 4.6, reviews: 218, inStock: true, onSale: true,
    description: "Explosive energy, laser focus, and skin-splitting pumps. Ignite features clinically-dosed citrulline, beta-alanine, and 200mg natural caffeine to push every set beyond failure.",
    ingredients: ["L-Citrulline Malate (6g)", "Beta-Alanine (3.2g)", "Caffeine Anhydrous (200mg)", "L-Tyrosine (1g)", "Taurine (1g)", "B-Vitamin Complex", "Natural Flavors", "Citric Acid"],
    nutritionFacts: [
      { label: "Calories", value: "5" }, { label: "Sodium", value: "50mg" }, { label: "Total Carbs", value: "1g" },
      { label: "Vitamin B6", value: "10mg" }, { label: "Vitamin B12", value: "500mcg" }, { label: "Niacin", value: "30mg" },
    ],
  },
  {
    id: 3, name: "BCAA Recovery", category: "Amino", price: 29.99, image: productBcaa,
    rating: 4.5, reviews: 156, inStock: true, onSale: false,
    description: "Fermented 2:1:1 BCAAs to accelerate muscle recovery and reduce soreness. Enhanced with electrolytes and coconut water powder for optimal hydration during and after training.",
    ingredients: ["L-Leucine (3g)", "L-Isoleucine (1.5g)", "L-Valine (1.5g)", "Coconut Water Powder", "Sodium Chloride", "Potassium Citrate", "Natural Flavors", "Stevia"],
    nutritionFacts: [
      { label: "Calories", value: "10" }, { label: "Sodium", value: "110mg" }, { label: "Potassium", value: "80mg" },
      { label: "Total BCAAs", value: "6g" }, { label: "Leucine", value: "3g" },
    ],
  },
  {
    id: 4, name: "Creatine Monohydrate", category: "Creatine", price: 24.99, image: productCreatine,
    rating: 4.9, reviews: 487, inStock: true, onSale: false,
    description: "Micronized creatine monohydrate — the most researched sports supplement in history. 5g per serving to increase strength, power output, and lean muscle mass. Unflavored for easy stacking.",
    ingredients: ["Micronized Creatine Monohydrate (5g)"],
    nutritionFacts: [
      { label: "Calories", value: "0" }, { label: "Creatine Monohydrate", value: "5g" }, { label: "Sodium", value: "0mg" },
    ],
  },
  {
    id: 5, name: "Daily Multivitamin", category: "Multivitamin", price: 14.99, originalPrice: 19.99, image: productVitamins,
    rating: 4.3, reviews: 89, inStock: true, onSale: true,
    description: "Complete daily multivitamin with 23 essential vitamins and minerals. Formulated for active adults to fill nutritional gaps and support immune function, energy, and overall wellness.",
    ingredients: ["Vitamin A (900mcg)", "Vitamin C (90mg)", "Vitamin D3 (50mcg)", "Vitamin E (15mg)", "Vitamin K (120mcg)", "B-Complex", "Zinc (11mg)", "Magnesium (400mg)", "Selenium (55mcg)", "Chromium (35mcg)"],
    nutritionFacts: [
      { label: "Calories", value: "5" }, { label: "Vitamin A", value: "900mcg (100%)" }, { label: "Vitamin C", value: "90mg (100%)" },
      { label: "Vitamin D", value: "50mcg (250%)" }, { label: "Iron", value: "8mg (44%)" }, { label: "Zinc", value: "11mg (100%)" },
    ],
  },
  {
    id: 6, name: "Omega-3 Fish Oil", category: "Multivitamin", price: 22.99, image: productOmega,
    rating: 4.4, reviews: 134, inStock: false, onSale: false,
    description: "Molecularly distilled fish oil delivering 1000mg EPA and 500mg DHA per serving. Supports heart health, brain function, and joint mobility. Enteric-coated softgels eliminate fishy aftertaste.",
    ingredients: ["Fish Oil Concentrate", "Gelatin (Softgel)", "Glycerin", "Purified Water", "Natural Lemon Flavor", "Mixed Tocopherols"],
    nutritionFacts: [
      { label: "Calories", value: "15" }, { label: "Total Fat", value: "1.5g" }, { label: "EPA", value: "1000mg" },
      { label: "DHA", value: "500mg" }, { label: "Total Omega-3s", value: "1800mg" },
    ],
  },
  {
    id: 7, name: "Mass Gainer Elite", category: "Whey Protein", price: 64.99, image: productProtein,
    rating: 4.2, reviews: 76, inStock: true, onSale: false,
    description: "High-calorie mass gainer with 50g protein and 250g carbs per serving. Engineered for hard-gainers looking to pack on serious size. Includes MCT oil and digestive enzymes.",
    ingredients: ["Whey Protein Concentrate", "Maltodextrin", "Oat Flour", "MCT Oil Powder", "Cocoa Powder", "Digestive Enzyme Blend", "Natural Flavors", "Sucralose"],
    nutritionFacts: [
      { label: "Calories", value: "1250" }, { label: "Protein", value: "50g" }, { label: "Total Carbs", value: "250g" },
      { label: "Total Fat", value: "8g" }, { label: "Sugars", value: "15g" }, { label: "Fiber", value: "5g" },
    ],
  },
  {
    id: 8, name: "Creatine HCL", category: "Creatine", price: 34.99, originalPrice: 44.99, image: productCreatine,
    rating: 4.7, reviews: 203, inStock: true, onSale: true,
    description: "Concentrated creatine hydrochloride — requires a smaller dose with superior solubility and zero bloating. Ideal for athletes who want the benefits of creatine without the water retention.",
    ingredients: ["Creatine Hydrochloride (2g)", "Citric Acid", "Natural Flavors", "Sucralose"],
    nutritionFacts: [
      { label: "Calories", value: "0" }, { label: "Creatine HCL", value: "2g" }, { label: "Sodium", value: "10mg" },
    ],
  },
  {
    id: 9, name: "Performance Shorts", category: "Shorts", price: 39.99, image: productBcaa,
    rating: 4.1, reviews: 45, inStock: true, onSale: false,
    description: "Lightweight, moisture-wicking training shorts with 4-way stretch fabric. Features a zippered pocket, reinforced seams, and a 7-inch inseam for full range of motion.",
    ingredients: ["87% Polyester", "13% Spandex"],
    nutritionFacts: [],
  },
  {
    id: 10, name: "Training Tee", category: "Shirts", price: 29.99, originalPrice: 34.99, image: productPreworkout,
    rating: 4.0, reviews: 62, inStock: false, onSale: true,
    description: "Anti-odor performance tee with raglan sleeves and flatlock stitching. Breathable mesh panels keep you cool during the most intense sessions.",
    ingredients: ["92% Polyester", "8% Elastane"],
    nutritionFacts: [],
  },
  {
    id: 11, name: "Amino Energy+", category: "Amino", price: 27.99, image: productBcaa,
    rating: 4.6, reviews: 178, inStock: true, onSale: false,
    description: "Versatile amino acid blend with natural caffeine from green tea and coffee bean. Use it as a pre-workout, afternoon pick-me-up, or intra-workout hydration fuel.",
    ingredients: ["Amino Acid Blend (5g)", "Green Tea Extract", "Green Coffee Bean Extract", "Taurine", "Citric Acid", "Natural Flavors", "Sucralose"],
    nutritionFacts: [
      { label: "Calories", value: "5" }, { label: "Caffeine", value: "100mg" }, { label: "Amino Acids", value: "5g" },
      { label: "Sodium", value: "35mg" },
    ],
  },
  {
    id: 12, name: "Casein Protein", category: "Whey Protein", price: 49.99, image: productOmega,
    rating: 4.5, reviews: 112, inStock: true, onSale: false,
    description: "Slow-digesting micellar casein that feeds your muscles for up to 8 hours. The perfect nighttime protein to minimize muscle breakdown while you sleep.",
    ingredients: ["Micellar Casein", "Natural & Artificial Flavors", "Cellulose Gum", "Soy Lecithin", "Sucralose", "Acesulfame Potassium"],
    nutritionFacts: [
      { label: "Calories", value: "130" }, { label: "Protein", value: "25g" }, { label: "Total Fat", value: "1g" },
      { label: "Total Carbs", value: "4g" }, { label: "Calcium", value: "500mg" }, { label: "Sodium", value: "200mg" },
    ],
  },
];

export const categories = ["Creatine", "Whey Protein", "Amino", "Multivitamin", "Shorts", "Shirts"];
