/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { HomeModule } from "./home.module";
import { ProductsModule } from "./products.module";
import { CategoriesModule } from "./categories.module";
import { RouterModule, Routes } from "@nestjs/core";
import { AuthModule } from "@app/auth/auth.module";
import { OrdersModule } from "./orders.module";
import { PaymentsModule } from "./payments.module";
import { UsersModule } from "./users.module";
import { EmailModule } from "./email.module";

const routes: Routes = [
    {
        path: '/',
        module: HomeModule
    },
    {
        path: '/auth',
        module: AuthModule
    },
    {
        path: '/products',
        module: ProductsModule
    },
    {
        path: '/categories',
        module: CategoriesModule
    },
    {
        path: '/users',
        module: UsersModule
    },
    {
        path: '/orders',
        module: OrdersModule
    },
    {
        path: '/payments',
        module: PaymentsModule
    },
    {
        path: '/email',
        module: EmailModule,
    },
];

@Module({
    imports: [
        RouterModule.register(routes), 
        HomeModule, 
        ProductsModule, 
        CategoriesModule, 
        AuthModule, 
        UsersModule, 
        OrdersModule,
        PaymentsModule,
        EmailModule,
    ],
    exports: [],
})
export class RoutingModule {}
