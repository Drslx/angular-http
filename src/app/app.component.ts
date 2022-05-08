import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

//
import { Car } from "./shared/models/car";
import { CarService } from "./services/car.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "angular-http";

  car = {} as Car;
  cars: Car[] | undefined;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  // Defini se um carro sera criado ou atualizado
  saveCar(form: NgForm) {
    if (this.car.id !== undefined) {
      this.carService.updateCar(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.carService.saveCar(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chamar o servico para obter os carros
  getCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  // Deletar um carro
  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });
  }

  // Copia o carro para ser editado
  editCar(car: Car) {
    this.car = { ...car };
  }

  // Limpa o formulario
  cleanForm(form: NgForm) {
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }
}
