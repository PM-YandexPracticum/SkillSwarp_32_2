// Import компонента и типов
import { SkillImageGalleryUI } from '@/shared/ui/skill-image-galleryUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/SkillImageGalleryUI',
  component: SkillImageGalleryUI, 
  tags: ['autodocs'], 
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSkillImageGallery: Story = {
  args: {
    images: 
        [
        {link: 'https://storage.myseldon.com/news-pict-ea/EA2301640F90D1E3A29BE868FF6AFE9C'},
        {link: 'https://avatars.mds.yandex.net/i?id=3770083e2c039dfcac43db6b40b54775_l-3925790-images-thumbs&n=13'},
        {link: 'https://storage.myseldon.com/news-pict-ea/EA2301640F90D1E3A29BE868FF6AFE9C'},
        {link: 'https://yandex-images.clstorage.net/qyot97367/c9ad02wH/7-LIePDfcyrs0ReDblIFGZdRD3i4VcVtfeQkSoIIijYZsqvvI-ryNsEq7aJbXVJW8xT0sqAONapU9JVj7BZMJkrGvSzVy9bOnNFGx972xLlWUFu5bGRkSP0nR_1ASvy03-V8iNQuF0elTrsUOgjTgtJ3oTc3z2HsQuNiod8WCDJPcWsZYcwAL02CN-Se4ObK9WGo2ziGwJ_KBMc_kyr8BB9FrIqXz_XBhJzbdx-YcCFhBiJ0tG7C_cGwsqD_VynQHrMKmqIPAi5vAaem_JMEq0XTKgpqlPN8aXR3T2E6HSYNR74a180HsHce6Nc_O1ODkQUQ5aVeAi0DEUExbwYZoD7h-NsCfKF8TlAWlzxCBzt0g4jqmwWCj2u2FOwBKk_nT4Z-mvZPR_OEfnhlbarysoJHkUc3bIIfwHOwcA_EyrBdUyopQu4i725gRdSeQoTbt-KaiBrH44xJRlc9wrt9t14Ubcrl7yUR5EzqFLxasLETlqLE5w4zr0ByoWH8p6ogjVH7KCHO8nxNQ_Z2nMEHO_Yy2QoY9ZGM-ETUjkLLr-csFvyatJ7lcWYfuLe8uYJCo-SzZ_YOIH9hMIMxP2bbw4_Siyiz3CLtjSE0NN8TRTtHsdtYSmfgvbtkV42yiu9kTrZuCob_JNNmXGvGnahSgsHXMtYVP_HuELOAcc2k2rNfwgiaEd5Bfo1hNJd_MyRZZqCpKwk24v961yYeUvh-VK6UzprX32RDpe1aJJ2IoWOidDOX9e_x_7GBwCFMZdriH4PI2aBusM4dQlRm_sGEilaS-sla99LNOURlX7F47hZ9RT6rxt-XkEYeqacPOoOAgGcxNNeMAK8wcWMzT5SZ4Exii0qS7AO-TlJWJ-1QZ3j1EAuoeOQw_8qEhW_D-uwnLVUMyATch5F3fTjU_VhjY0JUscQXvRINw-CRgg2WWEIOg3j5gFxynBxwVocOQZcLpGKb6OlV041LlAaeI0lNU'},
        {link: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'}
      ]       
  },
};
