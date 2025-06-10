const API_BASE = "http://localhost:8080/api";

export async function sendEmailValidationCode(email: string): Promise<void> {
  const response = await fetch(
    `${API_BASE}/send-email?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to send validation code");
  }
}

export interface ValidateEmailResponse {
  user_id: number;
}

export async function validateEmail(
  email: string,
  code: string
): Promise<ValidateEmailResponse> {
  const response = await fetch(`${API_BASE}/validate-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Invalid code or email");
  }

  return response.json();
}

export interface Product {
  price: string;
  currency: string;
  trial_days: number;
}

export interface ProductsResponse {
  monthly: Product;
  year: Product;
}

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function startTrial(user_id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/start-trial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to start trial");
  }
}
