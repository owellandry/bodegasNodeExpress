import { Type, Transform, Expose } from 'class-transformer'
/*
    "nombre": "string",
    "id_responsable": bigint,
    "estado": tyninit,
    "created_by": bigint,
    "update_by": bigint,
    "created_at": "timeStamp",
    "updated_at": timeStamp,
    "deleted_at": timeStamp
*/
let nombreReguex = /^[a-z A-Z]+$/
let numeroReguex = /^([0-9]+|Null)$/i;
let fechaReguex = /^([0-9]{4}-[0-9]{2}-[0-9]{2}|null)$/i;


export class DatoBodegas{
    @Expose({name:"nombre"})
    @Transform(({value})=>{
        let data =  nombreReguex.test(value)
        if(data) return (value)
        else throw {status: 401, message:"El valor de nombre no cumple con el formato esperado. (>_<)"}
    })
    nombre:string
    @Expose({name:"id_responsable"})
    @Transform(({value})=>{
        let data =  numeroReguex.test(value)
        if(data) return Number(value)
        else throw {status: 401, message:"El valor de id_responsable no cumple con el formato esperado. (>_<)"}
    })
    id_responsable :number
    @Expose({name:"estado"})
    @Transform(({value})=>{
        let data =  Number(numeroReguex.test(value))
        if(data) return Number(value)
        else throw {status: 401, message:"El valor de estado no cumple con el formato esperado. (>_<)"}
    })
    estado:number
    @Expose({name:"created_by"})
    @Transform(({value})=>{
        let data =  numeroReguex.test(value)
        if(value == null )  return null

        if(data && typeof value === 'number') {
            return  Number(value)
        }
        else{
            throw {status: 401, message:"El valor de update_by no cumple con el formato esperado. (>_<)"}
        }
    })
    created_by:number
    @Expose({name:"update_by"})
    @Transform(({value})=>{
        let data =  numeroReguex.test(value)
        if(value == null )  return null

        if(data && typeof value === 'number') {
            return  Number(value)
        }
        else{
            throw {status: 401, message:"El valor de update_by no cumple con el formato esperado. (>_<)"}
        }
    })
    update_by:number
    @Expose({name:"created_at"})
    @Transform(({value})=>{
        let data =  fechaReguex.test(value)
        if(data) return (value)
        else throw {status: 401, message:"El valor de created_at no cumple con el formato esperado. (>_<)"}
    })
    created_at:string
    @Expose({name:"updated_at"})
    @Transform(({value})=>{
        let data =  fechaReguex.test(value)
        if(data) return (value)
        else throw {status: 401, message:"El valor de updated_at no cumple con el formato esperado. (>_<)"}
    })
    updated_at:string
    @Expose({name:"deleted_at"})
    @Transform(({value})=>{
        let data =  fechaReguex.test(value)
        if(data) return (value)
        else throw {status: 401, message:"El valor de deleted_at no cumple con el formato esperado. (>_<)"}
    })
    deleted_at:string
    constructor(p1:string, p2:number, p3:number,p4:number, p5:number, p6:string, p7:string, p8:string){
        this.nombre=p1;
        this.id_responsable=p2;
        this.estado=p3;
        this.created_by=p4;
        this.update_by=p5;
        this.created_at=p6;
        this.updated_at=p7;
        this.deleted_at=p8;
    }
}