import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Model } from 'mongoose';
import { Shipment } from './schemas/shipment.schema';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel(Shipment.name) private ShipmentModel: Model<Shipment>,
  ) {}
  async create(createShipmentDto: CreateShipmentDto) {
    const createdShipment = new this.ShipmentModel(createShipmentDto);
    const savedShipment = await createdShipment.save();
    return savedShipment;
  }

  findAll() {
    return `This action returns all shipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipment`;
  }

  update(id: number, updateShipmentDto: UpdateShipmentDto) {
    return `This action updates a #${id} shipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }
}
