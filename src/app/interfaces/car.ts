export interface ICar{
    _id:string
    make:string
    model:string
    year:string
    imageURL:string
}

export class NewCar implements ICar {
    _id!: string
    make:string
    model:string
    year:string
    imageURL:string

    constructor(make:string,model:string,year:string,imageURL:string)
    {
        this.make=make
        this.model=model
        this.year=year
        this.imageURL=imageURL
    }
}
