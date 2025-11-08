export interface Medicament {
  id: string;
  denumire_completa: string;
  producator: string;
  pret: number;
  disponibilitate: boolean;
  data_expirare: string;
  prescriptie: boolean;
  descriere: string;
}