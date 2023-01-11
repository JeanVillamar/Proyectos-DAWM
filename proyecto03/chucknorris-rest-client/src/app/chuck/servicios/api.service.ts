import { Injectable } from "@angular/core";
import { Frase } from "../modelos/frase";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private frase: Frase = { value: "", icon_url: "", id: "", url: "" };
  private ChuckUrl = "https://api.chucknorris.io/jokes/random"; // URL to web api

  constructor(private http: HttpClient) { }

  //----------------------------------------------------------------

  public getFrase(): Observable<Frase> {
    return this.http.get<Frase>(this.ChuckUrl);
  }
}
