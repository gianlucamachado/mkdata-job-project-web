import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu-item.interface';
import { HomeService } from './home.service';

/**
 * Home Component.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * Loading present variable.
   */
  public loading: boolean = false;

  /**
   * Menu Itens.
   */
  public menu: MenuItem[] = [
    { icon: 'far fa-chart-bar', label: 'Dashboard', href: '/administrador/painel', isActive: true },
    { icon: 'fas fa-wrench', label: 'Solicitações', href: '/administrador/solicitacao', isActive: false },
    { icon: 'fas fa-store-alt', label: 'Empresas', href: '/administrador/empresa', isActive: false },
    { icon: 'fas fa-th-large', label: 'Serviços', href: '/administrador/servico', isActive: false },
    { icon: 'fas fa-map-marked', label: 'Locais', href: '/administrador/local', isActive: false },
    { icon: 'fas fa-user', label: 'Usuários', href: '/administrador/usuario', isActive: false },
    { icon: 'fas fa-file-alt', label: 'Relatórios', href: '/administrador/relatorio', isActive: false },
    { icon: 'fas fa-bell', label: 'Notificação', href: '/administrador/notificacao', isActive: false },
  ];

  /**
   * Selected menu item.
   */
  public selected: number = 0;

  /**
   * User object.
   */
  public user: any = {
    displayName: 'Developer Gempe',
    photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  };

  /**
   * @ignore
   */
  constructor(
    public router: Router,
    public homeService: HomeService,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // get active page
    await self.getActivePage();

  }

  /**
   * Get active page.
   */
  getActivePage(): Promise<any> {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // get active route
    // by route verify user is company or master admin
    const route = self.router.url;

    // return
    return new Promise((resolve) => {
      self.menu.forEach((item, index) => {

        // set active with false
        item.isActive = false;

        // if is active route set true
        if (route === item.href) {
          item.isActive = true;
          self.selected = index;
        }

      });

      resolve();
    });
  }

  /**
   * Change router page param.
   * @param item Menu item clicked.
   */
  changeRoute(item: MenuItem, index: number): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // change route
    self.router.navigate([item.href]);

    // set true selected
    item.isActive = true;

    // set false in active page and change
    self.menu[self.selected].isActive = false;

    // set new index
    self.selected = index;
  }

}
