// src/types.ts
export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Update: undefined;
  Items: undefined;
};

export interface Item {
  _id: string;
  name: string;
  description: string;
  img_url: string;
  seller: {
    userid: string;
    name: string;
  };
  isSold: boolean;
}
