import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { PublicationService } from 'src/app/operation/service/publication/publication.service';
import { TranslateService } from '@ngx-translate/core';
import * as SimpleMDE from 'simplemde';
import { marked } from 'marked';
import { TagService } from 'src/app/admin/service/tag.service';
import { convertFormGroupToFormData } from 'src/app/shared/utils/form-data.util';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  @ViewChild('mdeEditor', { static: true }) mdeEditor!: ElementRef;

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  publications: any[] = [];
  tags: any[] = [];
  selectedPhoto = '';
  isDragging = false;
  simpleMDE: SimpleMDE | undefined;
  currentPage = 0;
  hasMoreTags = true;
  publicationForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(1024)]],
    idTags: [<number[]>[], [Validators.required]],
    image: [null, [Validators.required]]
  });

  constructor(
    private readonly publicationService: PublicationService,
    private readonly fb: FormBuilder,
    private readonly TagService: TagService,
    private readonly blockUIService: BlockUIService,
    private readonly translateService: TranslateService,
    private readonly toastService: ToastService,
    private readonly formErrorService: FormErrorService
  ) {}

  ngOnInit(): void {
    this.handlerGetTags(0);
    this.initializeEditor();
  }

  handlerChangeImage(event: any) {
    const file = event.target.files[0];
    this.processFile(file);
    this.publicationForm.patchValue({
      image: file
    });
    console.log(this.publicationForm.value);
  }

  async onSubmit() {
    if (this.publicationForm.valid) {
      this.blockUIService.start();

      const descriptionMarkdown =
        this.publicationForm.get('description')?.value ?? '';
      const descriptionHTML = await marked(descriptionMarkdown);

      this.publicationForm.patchValue({
        description: descriptionHTML
      });

      const formData = convertFormGroupToFormData(this.publicationForm);

      this.publicationService.create(formData).subscribe({
        next: (response: any) => {
          this.publicationForm.reset();
          this.selectedPhoto = '';
          this.publicationForm.patchValue({
            idTags: [],
            image: null
          });
          this.blockUIService.stop();

          if (this.simpleMDE) {
            this.simpleMDE.value('');
          }

          this.toastService.showSuccessToast(
            this.translateService.instant('success.createNews')
          );
        },
        error: error => {
          console.log(error);
          this.toastService.showSuccessToast(
            this.translateService.instant(error.error.detail)
          );
          this.blockUIService.stop();
        }
      });
    }
  }

  toggleTag(tagId: number) {
    const selectedTags = this.publicationForm.get('idTags')?.value || [];

    if (selectedTags.includes(tagId)) {
      const newTags = selectedTags.filter((id: number) => id !== tagId);
      this.publicationForm.patchValue({ idTags: newTags });
    } else {
      this.publicationForm.patchValue({ idTags: [...selectedTags, tagId] });
    }
  }

  isSelected(tagId: number): boolean {
    const selectedTags = this.publicationForm.get('idTags')?.value || [];
    return selectedTags.includes(tagId);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processFile(file);
      event.dataTransfer.clearData();
    }
  }

  processFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedPhoto = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  clearImage() {
    this.selectedPhoto = '';
    this.publicationForm.patchValue({
      image: null
    });
  }

  handlerGetTags(page: number) {
    this.blockUIService.start();
    this.TagService.getAllTags(page).subscribe({
      next: (response: any) => {
        this.tags = response.content;
        console.log(response.last);
        this.hasMoreTags = !response.last;
        this.blockUIService.stop();
      },
      error: error => {
        console.log(error);
        this.blockUIService.stop();
      }
    });
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.handlerGetTags(this.currentPage);
    }
  }

  nextPage() {
    if (this.hasMoreTags) {
      this.currentPage++;
      this.handlerGetTags(this.currentPage);
    }
  }

  getErrorMessage(controlName: string) {
    return this.formErrorService.getErrorMessage(
      this.publicationForm,
      controlName
    );
  }

  initializeEditor() {
    if (this.simpleMDE) {
      this.simpleMDE.toTextArea();
    }

    this.simpleMDE = new SimpleMDE({
      element: this.mdeEditor.nativeElement,
      initialValue: this.publicationForm.get('description')?.value ?? '',
      placeholder: this.translateService.instant(
        'input.description.placeholder'
      ),
      toolbar: [
        'bold',
        'italic',
        '',
        'link',
        'quote',
        {
          name: 'code',
          action: SimpleMDE.toggleCodeBlock,
          className: 'fa fa-code',
          title: 'Insertar código'
        },
        '',
        'ordered-list',
        'unordered-list',
        'horizontal-rule',
        '',
        'undo',
        'redo',
        ''
      ],
      autosave: {
        enabled: false,
        uniqueId: 'questionEditor'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    });

    this.simpleMDE.codemirror.on('change', () => {
      this.publicationForm
        .get('description')
        ?.setValue(this.simpleMDE?.value() ?? '');
    });
  }
}
