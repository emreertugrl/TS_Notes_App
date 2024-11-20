// Etiket tipi
export type Tag = {
  label: string;
  value: string;
};
// formdan alınan verilerin tipi (id yok)
export type NoteData = {
  title: string;
  tags: Tag[];
  markdown: string;
};

// state'e kaydedilecek verilerin tipi (id var)
export type Note = { id: string } & NoteData;
