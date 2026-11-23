import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { CreateEmpInput, UpdateEmpInput } from './emp.model';
import { EmpService } from './emp.service';
import { CreateEmpDto, fetchCustomerDetailsDto, UpdateEmpDto } from './dto/emp.dto';

@Controller('emp')
export class EmpController {
  constructor(private readonly empService: EmpService) {}

  @Post()
  createEmp(@Body() input: CreateEmpDto) {
    return this.empService.createEmp(input);
  }




// Write an endpoint to get all categories with the number of products in each
// category.

@Get('fetchAllProductsWithCategory')
  getAllProducts() {
    console.log("is it reaching here");
    return this.empService.returnAllProducts();
  }

@Delete('withnoproducts')
  deleteCategoriesWithNoProducts() {
    return this.empService.deleteCategoriesWithNoProducts();
  }


@Get('orders/customers/:id')
getCustomerOrders(@Param('id', ParseIntPipe) id: number) {
  return this.empService.findOrdersByCustomerId(id);
}
  
@Get('/pending-orders')
getPendingOrders() {
  return this.empService.findPendingOrders();
}

@Get('customers-orderss-count')
getCustomerOrdersCount() {
  return this.empService.getCustomerOrdersCount();

}

@Get('customer-details')
getCustomerDetails(@Query('name') name: string) {
  console.log("name is", name);
  return this.empService.getCustomerDetails(name);
}

}