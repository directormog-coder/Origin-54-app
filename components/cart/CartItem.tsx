import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
};

export default function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  return (
    <div className="flex gap-6 p-6 bg-[var(--cream-dark)] border border-[var(--gold)]/10">
      <div className="relative h-40 w-32 flex-shrink-0 overflow-hidden bg-[var(--charcoal)]/5">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-[var(--gold)] font-display text-xs tracking-widest mb-1">
            {item.category}
          </p>
          <h3 className="font-display text-xl uppercase text-[var(--charcoal)]">
            {item.name}
          </h3>

          {item.artisan_name && (
            <p className="font-serif text-sm italic text-[var(--charcoal)]/50">
              by {item.artisan_name}
            </p>
          )}

          <p className="font-serif text-[var(--charcoal)]/80">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="h-8 w-8 border border-[var(--gold)]/30 text-[var(--charcoal)] hover:bg-[var(--gold)] hover:text-white"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="font-display text-lg w-8 text-center">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="h-8 w-8 border border-[var(--gold)]/30 text-[var(--charcoal)] hover:bg-[var(--gold)] hover:text-white"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="font-serif text-sm text-[var(--charcoal)]/40 underline transition hover:text-[var(--charcoal)]"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
