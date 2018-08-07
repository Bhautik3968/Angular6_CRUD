export class Error {    
    constructor(
        public ID?: number,
        public ErrorMessage?: string,
        public ErrorDescription?: string,
        public StatusCode?: number,
        public URL?: string           
    ) {}
}
