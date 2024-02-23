import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';

export class CreateStatusHistoryDto {
  @IsString()
  status: string;
}

export class CreateFeedbackDto {
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  createdBy?: string; // Assuming createdBy is the user's ID

  @IsOptional()
  createdAt?: Date;
}

export class CreateShipmentDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsOptional()
  @IsEnum(['Scheduled', 'In_Transit', 'Delivered', 'Canceled'])
  status: string;

  @IsOptional()
  deliveryRoute: string;

  @IsOptional()
  createdBy: string; // Assuming createdBy is the user's ID

  @IsOptional()
  feedback: CreateFeedbackDto;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  statusHistory: CreateStatusHistoryDto[];
}
