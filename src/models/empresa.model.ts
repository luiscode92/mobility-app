export class Empresa {
    constructor(
        public _id: string,
        public nombre: string,
        public tipo: string,
        public informacion: string,
        public descripcion: string,
        public lat?: number,
        public lng?: number,
        public img1?: string,
        public img2?: string,
        public img3?: string,
        public img4?: string,
        public usuario?: string                       
    ) { }
}
