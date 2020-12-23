import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Inventory} from "./entities/inventory.entity";
import {Item} from "./entities/item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Item])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
