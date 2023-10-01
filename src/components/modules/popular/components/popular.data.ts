interface InitPouplarInfoTypes {
  list: Array<React.ReactNode>;
  showAll: boolean;
  current: number;
}

// popular 데이터 초기 정보
export const initPopularInfo: InitPouplarInfoTypes = {
  list: [],
  showAll: false,
  current: 2,
};
