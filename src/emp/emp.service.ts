import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateEmpInput,
  EmpModel,
  Employee,
  UpdateEmpInput,
} from './emp.model';

@Injectable()
export class EmpService {
  constructor(private readonly empModel: EmpModel) {}

  async createEmp(input: CreateEmpInput): Promise<Employee> {
    // const fields = this.validateFields(input, ['name', 'age','dept_id','salary']);
    // if (!fields.name || !fields.salary) {
    //   throw new BadRequestException('name and salary are required');
    // }
    return this.empModel.create({ name: input.name, salary: input.salary, age: input.age, dept_id: input.dept_id });
  }

 
  returnAllProducts(){
    return this.empModel.fetchAllProductsWithCategory();
  }

  deleteCategoriesWithNoProducts(){
    return this.empModel.deleteCategoriesWithNoProducts();
  }
  async findById(id: number): Promise<Employee> {
    const employee = await this.empModel.findById(id);
    if (!employee) {
      throw new NotFoundException(`Employee ${id} not found`);
    }
    return employee;
  }

  async updateEmp(id: number, input: UpdateEmpInput): Promise<Employee> {
    const employee = await this.empModel.update(id, input);
    if (!employee) {
      throw new NotFoundException(`Employee ${id} not found`);
    }
    return employee;
  }


  async findOrdersByCustomerId(id: number){
    const orders = await this.empModel.findOrdersByCustomerId(id);
    if (!orders) {
      throw new NotFoundException(`Orders for Customer ${id} not found`);
    }
    return orders;
  }

  async findPendingOrders(){
    const orders = await this.empModel.findPendingOrders();
    if (!orders) {
      throw new NotFoundException(`No pending orders found`);
    }
    return orders;
  }

  async getCustomerOrdersCount() {
    const ordersCount = await this.empModel.findCustomerOrdersCount();
    if (!ordersCount) {
      throw new NotFoundException(`No customer orders found`);
    }
    return ordersCount;
  } 

  async getCustomerDetails(name: string) {
    console.log("name is", name);
    const customerDetails = await this.empModel.findCustomerDetails(name);
    if (!customerDetails) {
      throw new NotFoundException(`Customer details for ${name} not found`);
    }
    return customerDetails;
  }
}

