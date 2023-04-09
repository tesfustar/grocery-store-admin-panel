export interface ICoupon{
    code: string;
    discount: number;
    discountType: string;
    description: string;
    expiresAt: Date;
    enabled: boolean;
}

export interface ICouponFormProps {
    code: string;
    discount: string;
    discountType: string;
    description: string;
    expiresAt: Date | string;
    enabled: boolean;
  }