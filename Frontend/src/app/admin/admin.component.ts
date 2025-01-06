import { Component, OnInit,AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as powerbi from 'powerbi-client';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit{
  hideLogoBar = true;
  
  @ViewChild('powerbiContainer') powerbiContainer!: ElementRef;

  ngAfterViewInit() {
    const embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=85f63c7b-fee9-4fc2-9a4a-f0c9f8b500c4&groupId=d8a25792-b418-4e10-845a-7a9b03dcdffd&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19'
    // const embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=ffdef3d8-739e-484a-a05d-693d2a9f8b26/b9cddb298b1864b4496e';
    // const accessToken = 'H4sIAAAAAAAEAB2Tta7EVgAF_-W1jnRtrzFSCvOa1wydmZk3yr_nJfWZ5ow0f_98kqefkvznzx9emTdfDlqSIP3IU9l40_MSWTyOxfI0b3J0MmCVh1seI3K1zr6cYKXkJ2qZVkygoN4t27Z3xZm5TWMb4SRUZ7W2614faiHpHSNhsK8wmHHpjZ3YzpHtuBEC1eiH-1H4qhFfOly2YERQUAyVZxX6ESWc1TwQUCZyXq-rBaottMJDXUOiZUvJxKV1Eu_0U_Zp4NjN00nlhAf35S6pOrs2RDFH-wa9MizPYK0q-ApaIx3E3lC1oGdNgMSx2-csVr6Iexlp6r3IomoHSQk_pOYckuGM0aHq6SghGk4CLNYVT4W49JUootAUXAqhps8DbXxUtF9CEYnM91jHwv5WQp0vx6Z0LHrG72apimtBOVley04xnGwWDmup68CuUcoJF8_cwUDLDJ4Uxz1DnTJkja0OBHZz-ikR38iXv661pwtWR2LWXt1C0GCLuy-Q4wZWSyuJyutzlgbCD-is-Xf-Oor743Zhx2x8dMQESYYEE0LzbTry7GWkJVkznEXQ4caAuQtK08a-6uVg5whXijxn-CRz74oy9_t87P2RfE14er0GRAxckoaI5_PUYb43yfEwzJf19jdTqbipGL9LxCMdZ-pZcYs36OcZAGlipbZjilhITdG7Ve_9HP6uVPKd49gxePmuCNMmxeUTVuQMw6UTWa6f07HgS9Wko462zl7xwrmocBi_NkuInQhI1Foz2NVlLEfpiPHku3bJ1vKrGDQqkG5jP9fd_6o7RdZngEcwMZpN_2KR1tRFI7k9eJUCFR15maq24fL5nz9-uPWZ90ktnv9ysN41sVqv-90fTpEZwmrWFNX1fDoQcU6eQSZ7EGWx6JDnXzYkRY_mjFrJkaA3VZNWUBKpEhY8Z_kymYHkp6hrVmaJD-yiN18R4Qo8PvM-UhSza--pb2fcByk8s_dmoJYRBHMyEGxdoh7LN18-otluw4NIc_0sTKxSTRujwFcz87AVxnvw5dF6i4j73fiz0i3qFMZxchtshV61E4LKzZZOOKm2YqkH8bFouMCApfqHiMOvj8ZXfj4TaqZUxO9iQCr5U_bmZtgXE-tFXR5f3crmoGl9unbpGBv3cHtuHm5U7bNTHZCcK8uVT2NgXnK2J--SFyGdJUcN7KP5Iwh3Q2zWprX--us_zc9cF6vs_1rmRvTAEAOnawhIbxZrxYr-Mv9TTlONyX6sxS8mRb5vZCduLxrk2FLC29vst9nAgEHmSGUSPwv59uLBpWjPRdo2PN7Os-1ZlqNlcigFz3gyvCHkM2mwC4NV58AVm0yqeBhRGEX9GhzZJWsZJsDBXv3B-ESEKJ_2JdGyKcBF6jORiouhGw3CffjHrBj-TupF2Si8WKWThupCLbnJuQWrQIb1-QJsQ6ICKD39-phrx2ii1N3nfVx6Y2aSBB5xNePI0XYnCnh-9DFil09kjpV-782vIRA0b7RFa7fm_RlObYG_tc1ij5WOYxbjOKSE2nunUHmiiKqWeogAzTkJJMXdhd_lHLpiCz7D47yUAeQXNOKo-yhgPK8CcbQht3oU8vrV_M-_uLWO6gIGAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzM0MzU3NTQzLCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0='
    const accessToken ='b9cddb298b1864b4496e'
    const embedConfig = {
      type: 'report', // Use 'dashboard' or 'tile' for different embed types
      id: '85f63c7b-fee9-4fc2-9a4a-f0c9f8b500c4',
      embedUrl: embedUrl,
      accessToken: accessToken,
      tokenType: powerbi.models.TokenType.Aad,
      settings: {
        panes: {
          filters: {
            visible: false,
          },
          pageNavigation: {
            visible: true,
          },
        },
      },
    };

    const powerbiService = new powerbi.service.Service(powerbi.factories.hpmFactory, powerbi.factories.wpmpFactory, powerbi.factories.routerFactory);
    powerbiService.embed(this.powerbiContainer.nativeElement, embedConfig);
  }
  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.loadReport();
  // }

  // loadReport() {
  //   this.http.get<any>('/api/powerbi/embed-token').subscribe(
  //     (data) => {
  //       const container = document.querySelector('.powerbi-container') as HTMLElement;
  //       const config: pbi.IEmbedConfiguration = {
  //         type: 'report',
  //         id: data.reportId,
  //         embedUrl: data.embedUrl,
  //         accessToken: data.accessToken,
  //         tokenType: pbi.models.TokenType.Embed,
  //         settings: {
  //           panes: { filters: { visible: true }, pageNavigation: { visible: true } },
  //           layoutType: pbi.models.LayoutType.Custom,
  //         },
  //       };

  //       const powerbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
  //       powerbiService.embed(container, config);
  //     },
  //     (error) => {
  //       console.error('Error loading Power BI report:', error);
  //     }
  //   );
  // }
}