# npx create-react-app mp-app --template typescript

tsconfig.json 에서 nodejs환경이면  module:commonjs, react환경이면 module:esnext
typescript 타입

number
string
boolern
null
undefined
any

## 타입 만드는 법
1. interface 
아래에 있음

2. type 
export type Restaurant = {
  name:string;
  category:string;
  <!-- address:{
    city:string;
    zipCode:number;
  }; -->
  address:Address;
  menu:{
    name:string;
    price:number;
  }[]
}
다른 파일에서 import 하고 
let data:Restaurant 하면 됨
세분화해서 효율적으로 쓸 수 있음
export type Address = {
  city:string;
  detail:string;
  zipCode:number;
}

let a: number | string = 'qwe';
배열
let e:string[] = ['q', 'qwe'];
객체
var obj1: { name: string } = { name: "kim" };
  menu:{
    name:string;
    price:number;
  }

함수
function addNumbeer(a:number, b:number):number {
	return a+b
}

// 타입 지정
type myType = string | number;
var or2: myType = "str";
var or3: myType = 12;

type objType1 = {
  name: string;
};
var o2: objType1 = { name: "kim" };

## useState에서 사용(제네릭)
const [is, setIs] = useState<Restaurant>(data)

## props의 타입 지정, props에 함수 보내기
const change = (address:Address) => {
  setIs({...is, address:Address})
}
-------------------------
interface OwnProps {
  info:Restaurant,
  change(address:Address):void
}

const Store:React.FC<OwnProps> = (props) => {
  return (
    <div>store</div>
  )
}

## extends
interface에서 extends 사용
아까 export한 Menu 
<!-- interface OwnProps extends Menu { -->
interface OwnProps extends Omit<Menu, 'price'> {
  함수 등
}

type에서 extends 사용
type OwnProps = Menu & {
  함수 등
}

필요없는 변수가 있을 때(type)
type AddressWithout = Omit<Address, 'zipCode'>

필요한 변수가 있을 때
type OnlyCategory = Pick<Restaurant, 'category'>

아니면 처음에 type이나 interface 만들 때 zipCode?:number 이런 식으로도 가능. 주의 요망

## api에서 타입스크립트 사용법

export type ApiResponse<T> = {
  <!-- T의 타입이 data가 됨 -->
  data:T[],
  totalPage:number
}

나중에 
type RestaurantResponse = ApiResponse<Restaurant> 이렇게 dynamic하게 쓸 수 있다.

## 제네릭
function toArray<T>(a: T, b: T): T[] {
   return [a, b];
}

const toArray2 = <T>(a: T, b: T): T[] => { ... }

주의) 제네릭에서 인수를 '배열'로 받을 경우 따로 제네릭 처리를 T[]나 Array<T>로 해주어야 함

인터페이스와 많이 쓰임
interface Mobile<T> {
  ~~:T;
}

제네릭의 extends는 인터페이스나 클래스의 extends 와 약간 정의가 다르다.클래스의 extends는 상속의 의미로서 '확장' 의 정의를 가지지만, 제네릭의 extends는 '제한' 의 의미를 가진다는 차이점이 있다.따라서 <T extends K> 형태의 제네릭이 있다면, T가 K에 할당 가능해야 한다 라고 정의하면 된다.

