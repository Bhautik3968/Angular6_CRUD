export class Product {
    constructor(
        public ID: number = 0,
        public Name?: string,
        public Price?: string,
        public Quantity?: number,
        public Image?: string,  
        public Success?:boolean,  
        public ResponseString?: string,
        public StatusCode?: number          
    ) {}
}
