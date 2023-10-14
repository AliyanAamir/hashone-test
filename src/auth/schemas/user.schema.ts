import { Schema,Prop , SchemaFactory} from "@nestjs/mongoose";





@Schema({
    timestamps:true
})

export class User{
    @Prop()
    name:string
    @Prop({unique:[true,'Duplciate email entered']})
    email:string
    @Prop()
    password:string
    @Prop()
    activated:boolean
}

export const UserSchema = SchemaFactory.createForClass(User)