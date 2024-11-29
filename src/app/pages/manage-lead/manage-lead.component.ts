import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {LeadService} from "../../shared/service/lead.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../shared/utils/messageService";
import {LeadModel} from "../../shared/interface/lead.model";

@Component({
  selector: 'app-manage-lead',
  templateUrl: './manage-lead.component.html',
  styleUrls: ['./manage-lead.component.scss']
})
export class ManageLeadComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filterLeadForm!: FormGroup;
  createLeadForm!: FormGroup
  leadsData !: LeadModel[]
  pagination = { page: 1, pageSize: 10 };
  totalItems: number = 0;
  isLoading: boolean = false;
  showPagination: boolean = true;
  showRegisterLeadModal: boolean = false;
  showJustInvitedLead: boolean = true;


  constructor(private leadService: LeadService, private formBuilder: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit(): void {
   this.loadInstances()
   this.loadLeads()
  }

  loadLeads() {
    this.isLoading = true;

    this.filterLeadForm.patchValue({
      status: this.showJustInvitedLead ? 1 : 2,
    });

    const filterFormValue = this.filterLeadForm.value;
    const cleanedFilters = this.cleanObject({ ...filterFormValue, ...this.pagination });

    this.leadService.getLeads(cleanedFilters, this.pagination).pipe(
      takeUntil(this.destroy$),
      finalize(() => (this.isLoading = false)),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message || 'Erro ao carregar leads!';
        console.error(err);
        this.messageService.errorMessage(errorMessage);
        return throwError(() => err);
      })
    ).subscribe((res) => {
      this.leadsData = res.leads;
      this.totalItems = res.totalCount;
    });
  }


  createNewLead(): void {
   if(this.createLeadForm.invalid){
     this.messageService.errorMessage('Preencha os campos corretamente!');
     this.createLeadForm.markAsDirty()
     return
   }
    this.leadService.createLead(this.createLeadForm.value).pipe(takeUntil(this.destroy$),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message || 'Erro ao criar lead!';
        console.error(err);
        this.messageService.errorMessage(errorMessage);
        return throwError(() => err);
      }),
      ).subscribe((res) =>{
          console.log('aqui a res ao criar', res)
          this.messageService.successMessage('Lead Criada com sucesso!')
          this.closeRegisterLeadModal()


    })
  }

  updateLeadStatus(leadId: number, newStatus: number): void {
    this.leadService.updateLeadStatus(leadId, { status: newStatus })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: () => {
        this.messageService.successMessage('Status atualizado com sucesso!');
        this.loadLeads();
      },
    });
  }

  openRegisterLeadModal(){
    this.showRegisterLeadModal = true;
  }

  closeRegisterLeadModal(){
    this.showRegisterLeadModal = false;
    this.loadLeads()
  }


  clearFilters() {
    this.pagination.page = 1;
    this.showJustInvitedLead = true;
    this.filterLeadForm.reset({
      status: 1,
    });
    this.loadLeads();
  }

  toggleChangeTableStatus() {
    this.showJustInvitedLead = !this.showJustInvitedLead;
    this.loadLeads();
  }

  onPageIndexChange(pageIndex: number): void {
    this.pagination.page = pageIndex;
    this.loadLeads();
  }
  hasInvitedLeads(): boolean {
    return this.leadsData.some((lead) => lead.status === 1);
  }


  private loadInstances(){
    this.createLeadForm = this.formBuilder.group({
      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhoneNumber: ['', Validators.required],
      suburb: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
    });


    this.filterLeadForm = this.formBuilder.group({
      contactFirstName: [""],
      contactLastName: [""],
      contactEmail: [""],
      suburb: [""],
      category: [""],
      dateCreatedStart: [null],
      dateCreatedEnd: [null],
      minPrice: [0],
      maxPrice: [0],
      status: [this.showJustInvitedLead ? 1 : 2],
    })
  }

  // função para limpar objetos dos filtros, removendo valores nulos, vazios ou padrão
  private cleanObject(obj: any): any {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        // Filtrar valores nulos, strings vazias e 0, exceto para paginação
        if (['page', 'pageSize'].includes(key)) {
          return true; // sempre manter `page` e `pageSize`
        }
        return value !== null && value !== undefined && value !== '' && value !== 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
