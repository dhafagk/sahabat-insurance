import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_unduhan_sections_items_type" AS ENUM('pdf', 'link');
  CREATE TYPE "public"."enum_unduhan_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tabel_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_landing_page_why_choose_us_reasons_icon_name" AS ENUM('Car', 'Home', 'Plane', 'Shield', 'Anchor', 'Banknote', 'Flame', 'HardHat', 'Award', 'Trophy', 'MapPin', 'Zap');
  CREATE TYPE "public"."enum_landing_page_cta_banner_action_cards_icon" AS ENUM('whatsapp', 'envelope', 'agen', 'car', 'phone');
  CREATE TYPE "public"."enum_manajemen_board_display_order" AS ENUM('directors_first', 'commissioners_first');
  CREATE TYPE "public"."enum_footer_blocks_link_list_links_icon" AS ENUM('none', 'car', 'home', 'shield', 'plane', 'star', 'check', 'arrowRight', 'phone', 'mail', 'mapPin', 'file');
  CREATE TYPE "public"."enum_footer_blocks_contact_info_items_type" AS ENUM('phone', 'email', 'address', 'whatsapp');
  CREATE TYPE "public"."enum_footer_blocks_badge_accent_line" AS ENUM('none', 'line1', 'line2');
  CREATE TYPE "public"."enum_footer_lower_footer_social_links_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok');
  CREATE TYPE "public"."enum_contact_us_channels_icon_type" AS ENUM('phone', 'whatsapp', 'email', 'form');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"riplay_url" varchar,
  	"riplay_file_id" integer,
  	"sppa_url" varchar,
  	"sppa_file_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_news_status" DEFAULT 'draft' NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"slug" varchar,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"excerpt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_timeline_items_locales" (
  	"date" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_pages_status" DEFAULT 'draft' NOT NULL,
  	"slug" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"excerpt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "unduhan_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_unduhan_sections_items_type" DEFAULT 'pdf' NOT NULL,
  	"file_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "unduhan_sections_items_locales" (
  	"name" varchar NOT NULL,
  	"size" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "unduhan_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "unduhan_sections_locales" (
  	"category" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "unduhan" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_unduhan_status" DEFAULT 'draft' NOT NULL,
  	"slug" varchar,
  	"require_email_gate" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "unduhan_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tabel_tables_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tabel_tables_columns_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tabel_tables_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tabel_tables_rows_cells_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tabel_tables_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tabel_tables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tabel_tables_locales" (
  	"category" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tabel" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_tabel_status" DEFAULT 'draft' NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tabel_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "download_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"file_name" varchar,
  	"file_url" varchar,
  	"unduhan_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"products_id" integer,
  	"news_id" integer,
  	"tags_id" integer,
  	"pages_id" integer,
  	"unduhan_id" integer,
  	"tabel_id" integer,
  	"download_leads_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_page_why_choose_us_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" "enum_landing_page_why_choose_us_reasons_icon_name" NOT NULL
  );
  
  CREATE TABLE "landing_page_why_choose_us_reasons_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page_cta_banner_action_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_landing_page_cta_banner_action_cards_icon" NOT NULL,
  	"href" varchar,
  	"use_whatsapp_url" boolean DEFAULT false
  );
  
  CREATE TABLE "landing_page_cta_banner_action_cards_locales" (
  	"label" varchar NOT NULL,
  	"sublabel" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "landing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_whatsapp_url" varchar,
  	"hero_cta_primary_href" varchar,
  	"hero_cta_tertiary_href" varchar,
  	"promo_strip_button_href" varchar,
  	"why_choose_us_image_id" integer,
  	"why_choose_us_cta_href" varchar,
  	"cta_banner_primary_href" varchar,
  	"cta_banner_whatsapp_url" varchar,
  	"cta_banner_contact_phone" varchar,
  	"cta_banner_contact_email" varchar,
  	"cta_banner_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "landing_page_locales" (
  	"hero_description_desktop" varchar,
  	"hero_description_mobile" varchar,
  	"hero_cta_primary_label" varchar,
  	"hero_cta_tertiary_label" varchar,
  	"promo_strip_heading" varchar,
  	"promo_strip_button_label" varchar,
  	"products_section_badge" varchar,
  	"products_section_heading" varchar,
  	"why_choose_us_badge" varchar,
  	"why_choose_us_heading" varchar,
  	"why_choose_us_description" varchar,
  	"why_choose_us_cta_label" varchar,
  	"news_section_badge" varchar,
  	"news_section_heading" varchar,
  	"cta_banner_heading" varchar,
  	"cta_banner_subtext" varchar,
  	"cta_banner_primary_label" varchar,
  	"cta_banner_contact_address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "visi_misi_misi_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "visi_misi_misi_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "visi_misi_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"letter" varchar NOT NULL
  );
  
  CREATE TABLE "visi_misi_values_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "visi_misi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "visi_misi_locales" (
  	"page_title" varchar DEFAULT 'Visi Dan Misi',
  	"page_subtitle" varchar,
  	"visi_title" varchar DEFAULT 'Visi',
  	"visi_content" varchar,
  	"misi_title" varchar DEFAULT 'Misi',
  	"values_title" varchar DEFAULT 'Nilai-Nilai Perusahaan',
  	"values_subtitle" varchar DEFAULT 'Sahabat Insurance',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "manajemen_board_of_commissioners_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "manajemen_board_of_commissioners_members_locales" (
  	"position" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "manajemen_board_of_directors_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "manajemen_board_of_directors_members_locales" (
  	"position" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "manajemen_tata_kelola_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "manajemen_tata_kelola_columns_locales" (
  	"content" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "manajemen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"board_display_order" "enum_manajemen_board_display_order" DEFAULT 'directors_first',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "manajemen_locales" (
  	"page_title" varchar DEFAULT 'Manajemen',
  	"page_subtitle" varchar DEFAULT 'Dipimpin oleh para profesional berpengalaman yang berkomitmen pada keunggulan',
  	"board_of_commissioners_title" varchar DEFAULT 'Board of Commissioners',
  	"board_of_directors_title" varchar DEFAULT 'Board Of Directors',
  	"tata_kelola_title" varchar DEFAULT 'Tata Kelola',
  	"tata_kelola_subtitle" varchar DEFAULT 'Good Corporate Governance',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navbar_items_dropdown_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navbar_items_dropdown_items_sub_items_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navbar_items_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navbar_items_dropdown_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navbar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navbar_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navbar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_button_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navbar_locales" (
  	"cta_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_blocks_link_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"icon" "enum_footer_blocks_link_list_links_icon" DEFAULT 'none'
  );
  
  CREATE TABLE "footer_blocks_link_list_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_contact_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_blocks_contact_info_items_type" NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_contact_info_items_locales" (
  	"display_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_contact_info_locales" (
  	"company_name" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_text_content_locales" (
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_image_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"href" varchar,
  	"width" numeric DEFAULT 180,
  	"height" numeric DEFAULT 52,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_badge" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accent_line" "enum_footer_blocks_badge_accent_line" DEFAULT 'line2',
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_badge_locales" (
  	"line1" varchar,
  	"line2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_upper_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_upper_columns_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_lower_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_lower_footer_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_lower_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_lower_footer_social_links_platform" NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"lower_footer_copyright_text" varchar DEFAULT '© Hak Cipta 2011–2026 ® sahabatinsurance.id ® Seluruh Hak Cipta Dilindungi.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_us_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_type" "enum_contact_us_channels_icon_type" DEFAULT 'phone' NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "contact_us_channels_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href_label" varchar DEFAULT 'Selengkapnya',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_us_locales" (
  	"page_title" varchar DEFAULT 'Hubungi Kami',
  	"page_subtitle" varchar DEFAULT 'Kami siap membantu Anda. Pilih cara yang paling nyaman untuk menghubungi tim kami.',
  	"section_title" varchar DEFAULT 'Kami Siap Melayani Anda',
  	"section_subtitle" varchar DEFAULT 'We''d love to talk about how we can help you',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"maintenance_mode" boolean DEFAULT false,
  	"favicon_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_riplay_file_id_media_id_fk" FOREIGN KEY ("riplay_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_sppa_file_id_media_id_fk" FOREIGN KEY ("sppa_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items_locales" ADD CONSTRAINT "pages_blocks_timeline_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "unduhan_sections_items" ADD CONSTRAINT "unduhan_sections_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "unduhan_sections_items" ADD CONSTRAINT "unduhan_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unduhan_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "unduhan_sections_items_locales" ADD CONSTRAINT "unduhan_sections_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unduhan_sections_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "unduhan_sections" ADD CONSTRAINT "unduhan_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unduhan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "unduhan_sections_locales" ADD CONSTRAINT "unduhan_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unduhan_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "unduhan_locales" ADD CONSTRAINT "unduhan_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."unduhan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_tables_columns" ADD CONSTRAINT "tabel_tables_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel_tables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_tables_columns_locales" ADD CONSTRAINT "tabel_tables_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel_tables_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_tables_rows_cells" ADD CONSTRAINT "tabel_tables_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel_tables_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_tables_rows_cells_locales" ADD CONSTRAINT "tabel_tables_rows_cells_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel_tables_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_tables_rows" ADD CONSTRAINT "tabel_tables_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel_tables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_tables" ADD CONSTRAINT "tabel_tables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_tables_locales" ADD CONSTRAINT "tabel_tables_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel_tables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabel_locales" ADD CONSTRAINT "tabel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "download_leads" ADD CONSTRAINT "download_leads_unduhan_id_unduhan_id_fk" FOREIGN KEY ("unduhan_id") REFERENCES "public"."unduhan"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_unduhan_fk" FOREIGN KEY ("unduhan_id") REFERENCES "public"."unduhan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tabel_fk" FOREIGN KEY ("tabel_id") REFERENCES "public"."tabel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_download_leads_fk" FOREIGN KEY ("download_leads_id") REFERENCES "public"."download_leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_why_choose_us_reasons" ADD CONSTRAINT "landing_page_why_choose_us_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_why_choose_us_reasons_locales" ADD CONSTRAINT "landing_page_why_choose_us_reasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_why_choose_us_reasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_cta_banner_action_cards" ADD CONSTRAINT "landing_page_cta_banner_action_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_cta_banner_action_cards_locales" ADD CONSTRAINT "landing_page_cta_banner_action_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page_cta_banner_action_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_why_choose_us_image_id_media_id_fk" FOREIGN KEY ("why_choose_us_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("cta_banner_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_page_locales" ADD CONSTRAINT "landing_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visi_misi_misi_items" ADD CONSTRAINT "visi_misi_misi_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visi_misi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visi_misi_misi_items_locales" ADD CONSTRAINT "visi_misi_misi_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visi_misi_misi_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visi_misi_values" ADD CONSTRAINT "visi_misi_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visi_misi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visi_misi_values_locales" ADD CONSTRAINT "visi_misi_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visi_misi_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visi_misi" ADD CONSTRAINT "visi_misi_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "visi_misi_locales" ADD CONSTRAINT "visi_misi_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visi_misi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manajemen_board_of_commissioners_members" ADD CONSTRAINT "manajemen_board_of_commissioners_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manajemen_board_of_commissioners_members" ADD CONSTRAINT "manajemen_board_of_commissioners_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manajemen_board_of_commissioners_members_locales" ADD CONSTRAINT "manajemen_board_of_commissioners_members_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen_board_of_commissioners_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manajemen_board_of_directors_members" ADD CONSTRAINT "manajemen_board_of_directors_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manajemen_board_of_directors_members" ADD CONSTRAINT "manajemen_board_of_directors_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manajemen_board_of_directors_members_locales" ADD CONSTRAINT "manajemen_board_of_directors_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen_board_of_directors_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manajemen_tata_kelola_columns" ADD CONSTRAINT "manajemen_tata_kelola_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manajemen_tata_kelola_columns_locales" ADD CONSTRAINT "manajemen_tata_kelola_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen_tata_kelola_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manajemen_locales" ADD CONSTRAINT "manajemen_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manajemen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_items_dropdown_items_sub_items" ADD CONSTRAINT "navbar_items_dropdown_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_items_dropdown_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_items_dropdown_items_sub_items_locales" ADD CONSTRAINT "navbar_items_dropdown_items_sub_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_items_dropdown_items_sub_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_items_dropdown_items" ADD CONSTRAINT "navbar_items_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_items_dropdown_items_locales" ADD CONSTRAINT "navbar_items_dropdown_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_items_dropdown_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_items" ADD CONSTRAINT "navbar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_items_locales" ADD CONSTRAINT "navbar_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_locales" ADD CONSTRAINT "navbar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_link_list_links" ADD CONSTRAINT "footer_blocks_link_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_link_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_link_list_links_locales" ADD CONSTRAINT "footer_blocks_link_list_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_link_list_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_link_list" ADD CONSTRAINT "footer_blocks_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_contact_info_items" ADD CONSTRAINT "footer_blocks_contact_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_contact_info_items_locales" ADD CONSTRAINT "footer_blocks_contact_info_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_contact_info_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_contact_info" ADD CONSTRAINT "footer_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_contact_info_locales" ADD CONSTRAINT "footer_blocks_contact_info_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_text_content" ADD CONSTRAINT "footer_blocks_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_text_content_locales" ADD CONSTRAINT "footer_blocks_text_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_text_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_image_content" ADD CONSTRAINT "footer_blocks_image_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_image_content" ADD CONSTRAINT "footer_blocks_image_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_badge" ADD CONSTRAINT "footer_blocks_badge_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_badge_locales" ADD CONSTRAINT "footer_blocks_badge_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_badge"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_upper_columns" ADD CONSTRAINT "footer_upper_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_upper_columns_locales" ADD CONSTRAINT "footer_upper_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_upper_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_lower_footer_links" ADD CONSTRAINT "footer_lower_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_lower_footer_links_locales" ADD CONSTRAINT "footer_lower_footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_lower_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_lower_footer_social_links" ADD CONSTRAINT "footer_lower_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_channels" ADD CONSTRAINT "contact_us_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_channels_locales" ADD CONSTRAINT "contact_us_channels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us_channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_locales" ADD CONSTRAINT "contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "products_icon_idx" ON "products" USING btree ("icon_id");
  CREATE INDEX "products_riplay_riplay_file_idx" ON "products" USING btree ("riplay_file_id");
  CREATE INDEX "products_sppa_sppa_file_idx" ON "products" USING btree ("sppa_file_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_image_idx" ON "news" USING btree ("image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_tags_id_idx" ON "news_rels" USING btree ("tags_id");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_name_idx" ON "tags_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_timeline_items_locales_locale_parent_id_unique" ON "pages_blocks_timeline_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_image_idx" ON "pages" USING btree ("image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "unduhan_sections_items_order_idx" ON "unduhan_sections_items" USING btree ("_order");
  CREATE INDEX "unduhan_sections_items_parent_id_idx" ON "unduhan_sections_items" USING btree ("_parent_id");
  CREATE INDEX "unduhan_sections_items_file_idx" ON "unduhan_sections_items" USING btree ("file_id");
  CREATE UNIQUE INDEX "unduhan_sections_items_locales_locale_parent_id_unique" ON "unduhan_sections_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "unduhan_sections_order_idx" ON "unduhan_sections" USING btree ("_order");
  CREATE INDEX "unduhan_sections_parent_id_idx" ON "unduhan_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "unduhan_sections_locales_locale_parent_id_unique" ON "unduhan_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "unduhan_slug_idx" ON "unduhan" USING btree ("slug");
  CREATE INDEX "unduhan_updated_at_idx" ON "unduhan" USING btree ("updated_at");
  CREATE INDEX "unduhan_created_at_idx" ON "unduhan" USING btree ("created_at");
  CREATE UNIQUE INDEX "unduhan_locales_locale_parent_id_unique" ON "unduhan_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tabel_tables_columns_order_idx" ON "tabel_tables_columns" USING btree ("_order");
  CREATE INDEX "tabel_tables_columns_parent_id_idx" ON "tabel_tables_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tabel_tables_columns_locales_locale_parent_id_unique" ON "tabel_tables_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tabel_tables_rows_cells_order_idx" ON "tabel_tables_rows_cells" USING btree ("_order");
  CREATE INDEX "tabel_tables_rows_cells_parent_id_idx" ON "tabel_tables_rows_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tabel_tables_rows_cells_locales_locale_parent_id_unique" ON "tabel_tables_rows_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tabel_tables_rows_order_idx" ON "tabel_tables_rows" USING btree ("_order");
  CREATE INDEX "tabel_tables_rows_parent_id_idx" ON "tabel_tables_rows" USING btree ("_parent_id");
  CREATE INDEX "tabel_tables_order_idx" ON "tabel_tables" USING btree ("_order");
  CREATE INDEX "tabel_tables_parent_id_idx" ON "tabel_tables" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tabel_tables_locales_locale_parent_id_unique" ON "tabel_tables_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tabel_slug_idx" ON "tabel" USING btree ("slug");
  CREATE INDEX "tabel_updated_at_idx" ON "tabel" USING btree ("updated_at");
  CREATE INDEX "tabel_created_at_idx" ON "tabel" USING btree ("created_at");
  CREATE UNIQUE INDEX "tabel_locales_locale_parent_id_unique" ON "tabel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "download_leads_unduhan_idx" ON "download_leads" USING btree ("unduhan_id");
  CREATE INDEX "download_leads_updated_at_idx" ON "download_leads" USING btree ("updated_at");
  CREATE INDEX "download_leads_created_at_idx" ON "download_leads" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_unduhan_id_idx" ON "payload_locked_documents_rels" USING btree ("unduhan_id");
  CREATE INDEX "payload_locked_documents_rels_tabel_id_idx" ON "payload_locked_documents_rels" USING btree ("tabel_id");
  CREATE INDEX "payload_locked_documents_rels_download_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("download_leads_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "landing_page_why_choose_us_reasons_order_idx" ON "landing_page_why_choose_us_reasons" USING btree ("_order");
  CREATE INDEX "landing_page_why_choose_us_reasons_parent_id_idx" ON "landing_page_why_choose_us_reasons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "landing_page_why_choose_us_reasons_locales_locale_parent_id_" ON "landing_page_why_choose_us_reasons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "landing_page_cta_banner_action_cards_order_idx" ON "landing_page_cta_banner_action_cards" USING btree ("_order");
  CREATE INDEX "landing_page_cta_banner_action_cards_parent_id_idx" ON "landing_page_cta_banner_action_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "landing_page_cta_banner_action_cards_locales_locale_parent_i" ON "landing_page_cta_banner_action_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "landing_page_why_choose_us_why_choose_us_image_idx" ON "landing_page" USING btree ("why_choose_us_image_id");
  CREATE INDEX "landing_page_cta_banner_cta_banner_background_image_idx" ON "landing_page" USING btree ("cta_banner_background_image_id");
  CREATE UNIQUE INDEX "landing_page_locales_locale_parent_id_unique" ON "landing_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "visi_misi_misi_items_order_idx" ON "visi_misi_misi_items" USING btree ("_order");
  CREATE INDEX "visi_misi_misi_items_parent_id_idx" ON "visi_misi_misi_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "visi_misi_misi_items_locales_locale_parent_id_unique" ON "visi_misi_misi_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "visi_misi_values_order_idx" ON "visi_misi_values" USING btree ("_order");
  CREATE INDEX "visi_misi_values_parent_id_idx" ON "visi_misi_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "visi_misi_values_locales_locale_parent_id_unique" ON "visi_misi_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "visi_misi_featured_image_idx" ON "visi_misi" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "visi_misi_locales_locale_parent_id_unique" ON "visi_misi_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "manajemen_board_of_commissioners_members_order_idx" ON "manajemen_board_of_commissioners_members" USING btree ("_order");
  CREATE INDEX "manajemen_board_of_commissioners_members_parent_id_idx" ON "manajemen_board_of_commissioners_members" USING btree ("_parent_id");
  CREATE INDEX "manajemen_board_of_commissioners_members_photo_idx" ON "manajemen_board_of_commissioners_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "manajemen_board_of_commissioners_members_locales_locale_pare" ON "manajemen_board_of_commissioners_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "manajemen_board_of_directors_members_order_idx" ON "manajemen_board_of_directors_members" USING btree ("_order");
  CREATE INDEX "manajemen_board_of_directors_members_parent_id_idx" ON "manajemen_board_of_directors_members" USING btree ("_parent_id");
  CREATE INDEX "manajemen_board_of_directors_members_photo_idx" ON "manajemen_board_of_directors_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "manajemen_board_of_directors_members_locales_locale_parent_i" ON "manajemen_board_of_directors_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "manajemen_tata_kelola_columns_order_idx" ON "manajemen_tata_kelola_columns" USING btree ("_order");
  CREATE INDEX "manajemen_tata_kelola_columns_parent_id_idx" ON "manajemen_tata_kelola_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "manajemen_tata_kelola_columns_locales_locale_parent_id_uniqu" ON "manajemen_tata_kelola_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "manajemen_locales_locale_parent_id_unique" ON "manajemen_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navbar_items_dropdown_items_sub_items_order_idx" ON "navbar_items_dropdown_items_sub_items" USING btree ("_order");
  CREATE INDEX "navbar_items_dropdown_items_sub_items_parent_id_idx" ON "navbar_items_dropdown_items_sub_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navbar_items_dropdown_items_sub_items_locales_locale_parent_" ON "navbar_items_dropdown_items_sub_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navbar_items_dropdown_items_order_idx" ON "navbar_items_dropdown_items" USING btree ("_order");
  CREATE INDEX "navbar_items_dropdown_items_parent_id_idx" ON "navbar_items_dropdown_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navbar_items_dropdown_items_locales_locale_parent_id_unique" ON "navbar_items_dropdown_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navbar_items_order_idx" ON "navbar_items" USING btree ("_order");
  CREATE INDEX "navbar_items_parent_id_idx" ON "navbar_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navbar_items_locales_locale_parent_id_unique" ON "navbar_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navbar_locales_locale_parent_id_unique" ON "navbar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_link_list_links_order_idx" ON "footer_blocks_link_list_links" USING btree ("_order");
  CREATE INDEX "footer_blocks_link_list_links_parent_id_idx" ON "footer_blocks_link_list_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_blocks_link_list_links_locales_locale_parent_id_uniqu" ON "footer_blocks_link_list_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_link_list_order_idx" ON "footer_blocks_link_list" USING btree ("_order");
  CREATE INDEX "footer_blocks_link_list_parent_id_idx" ON "footer_blocks_link_list" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_link_list_path_idx" ON "footer_blocks_link_list" USING btree ("_path");
  CREATE INDEX "footer_blocks_contact_info_items_order_idx" ON "footer_blocks_contact_info_items" USING btree ("_order");
  CREATE INDEX "footer_blocks_contact_info_items_parent_id_idx" ON "footer_blocks_contact_info_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_blocks_contact_info_items_locales_locale_parent_id_un" ON "footer_blocks_contact_info_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_contact_info_order_idx" ON "footer_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "footer_blocks_contact_info_parent_id_idx" ON "footer_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_contact_info_path_idx" ON "footer_blocks_contact_info" USING btree ("_path");
  CREATE UNIQUE INDEX "footer_blocks_contact_info_locales_locale_parent_id_unique" ON "footer_blocks_contact_info_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_text_content_order_idx" ON "footer_blocks_text_content" USING btree ("_order");
  CREATE INDEX "footer_blocks_text_content_parent_id_idx" ON "footer_blocks_text_content" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_text_content_path_idx" ON "footer_blocks_text_content" USING btree ("_path");
  CREATE UNIQUE INDEX "footer_blocks_text_content_locales_locale_parent_id_unique" ON "footer_blocks_text_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_image_content_order_idx" ON "footer_blocks_image_content" USING btree ("_order");
  CREATE INDEX "footer_blocks_image_content_parent_id_idx" ON "footer_blocks_image_content" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_image_content_path_idx" ON "footer_blocks_image_content" USING btree ("_path");
  CREATE INDEX "footer_blocks_image_content_image_idx" ON "footer_blocks_image_content" USING btree ("image_id");
  CREATE INDEX "footer_blocks_badge_order_idx" ON "footer_blocks_badge" USING btree ("_order");
  CREATE INDEX "footer_blocks_badge_parent_id_idx" ON "footer_blocks_badge" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_badge_path_idx" ON "footer_blocks_badge" USING btree ("_path");
  CREATE UNIQUE INDEX "footer_blocks_badge_locales_locale_parent_id_unique" ON "footer_blocks_badge_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_upper_columns_order_idx" ON "footer_upper_columns" USING btree ("_order");
  CREATE INDEX "footer_upper_columns_parent_id_idx" ON "footer_upper_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_upper_columns_locales_locale_parent_id_unique" ON "footer_upper_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_lower_footer_links_order_idx" ON "footer_lower_footer_links" USING btree ("_order");
  CREATE INDEX "footer_lower_footer_links_parent_id_idx" ON "footer_lower_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_lower_footer_links_locales_locale_parent_id_unique" ON "footer_lower_footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_lower_footer_social_links_order_idx" ON "footer_lower_footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_lower_footer_social_links_parent_id_idx" ON "footer_lower_footer_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_us_channels_order_idx" ON "contact_us_channels" USING btree ("_order");
  CREATE INDEX "contact_us_channels_parent_id_idx" ON "contact_us_channels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_us_channels_locales_locale_parent_id_unique" ON "contact_us_channels_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_us_locales_locale_parent_id_unique" ON "contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline_items_locales" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "unduhan_sections_items" CASCADE;
  DROP TABLE "unduhan_sections_items_locales" CASCADE;
  DROP TABLE "unduhan_sections" CASCADE;
  DROP TABLE "unduhan_sections_locales" CASCADE;
  DROP TABLE "unduhan" CASCADE;
  DROP TABLE "unduhan_locales" CASCADE;
  DROP TABLE "tabel_tables_columns" CASCADE;
  DROP TABLE "tabel_tables_columns_locales" CASCADE;
  DROP TABLE "tabel_tables_rows_cells" CASCADE;
  DROP TABLE "tabel_tables_rows_cells_locales" CASCADE;
  DROP TABLE "tabel_tables_rows" CASCADE;
  DROP TABLE "tabel_tables" CASCADE;
  DROP TABLE "tabel_tables_locales" CASCADE;
  DROP TABLE "tabel" CASCADE;
  DROP TABLE "tabel_locales" CASCADE;
  DROP TABLE "download_leads" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_page_why_choose_us_reasons" CASCADE;
  DROP TABLE "landing_page_why_choose_us_reasons_locales" CASCADE;
  DROP TABLE "landing_page_cta_banner_action_cards" CASCADE;
  DROP TABLE "landing_page_cta_banner_action_cards_locales" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TABLE "landing_page_locales" CASCADE;
  DROP TABLE "visi_misi_misi_items" CASCADE;
  DROP TABLE "visi_misi_misi_items_locales" CASCADE;
  DROP TABLE "visi_misi_values" CASCADE;
  DROP TABLE "visi_misi_values_locales" CASCADE;
  DROP TABLE "visi_misi" CASCADE;
  DROP TABLE "visi_misi_locales" CASCADE;
  DROP TABLE "manajemen_board_of_commissioners_members" CASCADE;
  DROP TABLE "manajemen_board_of_commissioners_members_locales" CASCADE;
  DROP TABLE "manajemen_board_of_directors_members" CASCADE;
  DROP TABLE "manajemen_board_of_directors_members_locales" CASCADE;
  DROP TABLE "manajemen_tata_kelola_columns" CASCADE;
  DROP TABLE "manajemen_tata_kelola_columns_locales" CASCADE;
  DROP TABLE "manajemen" CASCADE;
  DROP TABLE "manajemen_locales" CASCADE;
  DROP TABLE "navbar_items_dropdown_items_sub_items" CASCADE;
  DROP TABLE "navbar_items_dropdown_items_sub_items_locales" CASCADE;
  DROP TABLE "navbar_items_dropdown_items" CASCADE;
  DROP TABLE "navbar_items_dropdown_items_locales" CASCADE;
  DROP TABLE "navbar_items" CASCADE;
  DROP TABLE "navbar_items_locales" CASCADE;
  DROP TABLE "navbar" CASCADE;
  DROP TABLE "navbar_locales" CASCADE;
  DROP TABLE "footer_blocks_link_list_links" CASCADE;
  DROP TABLE "footer_blocks_link_list_links_locales" CASCADE;
  DROP TABLE "footer_blocks_link_list" CASCADE;
  DROP TABLE "footer_blocks_contact_info_items" CASCADE;
  DROP TABLE "footer_blocks_contact_info_items_locales" CASCADE;
  DROP TABLE "footer_blocks_contact_info" CASCADE;
  DROP TABLE "footer_blocks_contact_info_locales" CASCADE;
  DROP TABLE "footer_blocks_text_content" CASCADE;
  DROP TABLE "footer_blocks_text_content_locales" CASCADE;
  DROP TABLE "footer_blocks_image_content" CASCADE;
  DROP TABLE "footer_blocks_badge" CASCADE;
  DROP TABLE "footer_blocks_badge_locales" CASCADE;
  DROP TABLE "footer_upper_columns" CASCADE;
  DROP TABLE "footer_upper_columns_locales" CASCADE;
  DROP TABLE "footer_lower_footer_links" CASCADE;
  DROP TABLE "footer_lower_footer_links_locales" CASCADE;
  DROP TABLE "footer_lower_footer_social_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "contact_us_channels" CASCADE;
  DROP TABLE "contact_us_channels_locales" CASCADE;
  DROP TABLE "contact_us" CASCADE;
  DROP TABLE "contact_us_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_unduhan_sections_items_type";
  DROP TYPE "public"."enum_unduhan_status";
  DROP TYPE "public"."enum_tabel_status";
  DROP TYPE "public"."enum_landing_page_why_choose_us_reasons_icon_name";
  DROP TYPE "public"."enum_landing_page_cta_banner_action_cards_icon";
  DROP TYPE "public"."enum_manajemen_board_display_order";
  DROP TYPE "public"."enum_footer_blocks_link_list_links_icon";
  DROP TYPE "public"."enum_footer_blocks_contact_info_items_type";
  DROP TYPE "public"."enum_footer_blocks_badge_accent_line";
  DROP TYPE "public"."enum_footer_lower_footer_social_links_platform";
  DROP TYPE "public"."enum_contact_us_channels_icon_type";`)
}
