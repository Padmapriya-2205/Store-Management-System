import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpDto {
  @ApiProperty({ example: 'Padma' })
  name: string;

  @ApiProperty({ example: 25000 })
  salary: number;

  @ApiProperty({ example: 25 })
  age: number;

  @ApiProperty({ example: 25 })
  dept_id: number;
}

export class UpdateEmpDto {
  @ApiProperty({ example: 'Padma' })
  name?: string;

  @ApiProperty({ example: 25000 })
  salary?: number;

  @ApiProperty({ example: 25 })
  age?: number;

  @ApiProperty({ example: 25 })
  dept_id?: number;
}


export class fetchCustomerDetailsDto {
  @ApiProperty({ example: 'Padma' })
  name: string;

}

export class GetEmpDto {
  
}