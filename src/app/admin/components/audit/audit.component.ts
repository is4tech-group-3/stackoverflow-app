import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/components/modal/service/modal.service';
import { AuditService } from '../../service/audit/audit.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown/dropdown.component';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('entityDropdown') entityDropdown!: DropdownComponent;
  @ViewChild('httpMethodDropdown') httpMethodDropdown!: DropdownComponent;

  selectedOption: string | null = null;
  audits: any[] = [];
  selectedAudit: any = null;
  paginatedAudits: any[] = [];
  pageSize = 12;
  currentPage = 1;
  startDate: string | null = null;
  endDate: string | null = null;
  totalLength = 0;

  constructor(
    private readonly auditService: AuditService,
    private readonly modalService: ModalService,
    private readonly translate: TranslateService,
    private readonly validatorForm: FormBuilder,
    private readonly blockUIService: BlockUIService
  ) {}

  searchForm = this.validatorForm.group({
    email: ['', [Validators.email]],
    startDate: [''],
    endDate: [''],
    httpMethod: [''],
    entity: ['']
  });

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;

    this.handlerGetAudits({
      limit: this.pageSize.toString(),
      page: this.currentPage.toString(),
      email: this.searchForm.value.email,
      startDate: this.searchForm.value.startDate,
      endDate: this.searchForm.value.endDate,
      httpMethod: this.searchForm.value.httpMethod,
      entity: this.searchForm.value.entity
    });
  }

  onReset() {
    this.selectedOption = null;
    this.entityDropdown.reset();
    this.httpMethodDropdown.reset();

    this.searchForm.setValue({
      email: '',
      startDate: '',
      endDate: '',
      httpMethod: '',
      entity: ''
    });

    this.handlerGetAudits({
      limit: this.pageSize.toString(),
      page: this.currentPage.toString()
    });
  }
  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

  openModal(audit: any) {
    this.selectedAudit = audit;
    this.modalService.open(
      this.translate.instant('audit.data.details'),
      this.modalContent
    );
  }

  onSearch() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      this.handlerGetAudits({
        limit: this.pageSize.toString(),
        page: this.currentPage.toString(),
        email: this.searchForm.value.email,
        startDate: this.searchForm.value.startDate,
        endDate: this.searchForm.value.endDate,
        httpMethod: this.searchForm.value.httpMethod,
        entity: this.searchForm.value.entity
      });
    }
  }

  getHttpMethodClass(httpMethod: string): string {
    switch (httpMethod) {
      case 'GET':
        return 'text-emerald-500';
      case 'POST':
        return 'text-amber-500';
      case 'PUT':
        return 'text-blue-500';
      case 'DELETE':
        return 'text-rose-500';
      case 'PATCH':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  }

  getStatusHttpMethod(statusHttp: number): string {
    if (statusHttp >= 200 && statusHttp < 300) {
      return 'text-emerald-500';
    } else if (statusHttp >= 300 && statusHttp < 400) {
      return 'text-purple-500';
    } else if (statusHttp >= 400 && statusHttp < 500) {
      return 'text-amber-500';
    } else if (statusHttp >= 500 && statusHttp < 600) {
      return 'text-rose-500';
    } else {
      return 'text-gray-500';
    }
  }

  ngOnInit(): void {
    const params = {
      limit: '12',
      page: '1'
    };
    this.handlerGetAudits(params);
  }

  handlerGetAudits(params?: Params) {
    this.blockUIService.start();
    this.auditService.get(params).subscribe({
      next: (response: any) => {
        this.blockUIService.stop();
        this.audits = response?.audits || [];
        this.totalLength = response.pagination.totalAudits;
        this.currentPage = response.pagination.currentPage;
      },
      error: () => {
        this.blockUIService.stop();
        console.log('Error al obtener los registros de auditoría');
      }
    });
  }
}
