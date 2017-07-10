-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.0-beta
-- PostgreSQL version: 9.6
-- Project Site: pgmodeler.com.br
-- Model Author: ---

-- object: nannyfinder | type: ROLE --
-- DROP ROLE IF EXISTS nannyfinder;
CREATE ROLE nannyfinder WITH 
	SUPERUSER
	INHERIT
	LOGIN
	ENCRYPTED PASSWORD '********';
-- ddl-end --

-- object: admin | type: ROLE --
-- DROP ROLE IF EXISTS admin;
CREATE ROLE admin WITH 
	INHERIT
	LOGIN
	ENCRYPTED PASSWORD '********';
-- ddl-end --


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: nannyfinder | type: DATABASE --
-- -- DROP DATABASE IF EXISTS nannyfinder;
-- CREATE DATABASE nannyfinder
-- 	ENCODING = 'UTF8'
-- 	LC_COLLATE = 'es_ES.UTF-8'
-- 	LC_CTYPE = 'es_ES.UTF-8'
-- 	TABLESPACE = pg_default
-- 	OWNER = admin
-- ;
-- -- ddl-end --
-- 

-- object: public."User_ID_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."User_ID_seq" CASCADE;
CREATE SEQUENCE public."User_ID_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
ALTER SEQUENCE public."User_ID_seq" OWNER TO admin;
-- ddl-end --

-- object: public."User" | type: TABLE --
-- DROP TABLE IF EXISTS public."User" CASCADE;
CREATE TABLE public."User"(
	id integer NOT NULL DEFAULT nextval('public."User_ID_seq"'::regclass),
	email character varying(320) NOT NULL,
	password character varying(256) NOT NULL,
	"firstName" character varying(85) NOT NULL,
	"lastName" character varying(256) NOT NULL,
	address character varying NOT NULL,
	"phoneNumber" character varying(32) NOT NULL,
	experience character varying DEFAULT 'No experience',
	"firstAid" boolean DEFAULT false,
	monitor boolean DEFAULT false,
	"eduTitle" boolean DEFAULT false,
	smoker boolean DEFAULT false,
	photo character varying DEFAULT 'default.svg',
	role smallint,
	username character varying,
	"createdAt" character varying,
	"updatedAt" character varying,
	"driveLicense" boolean DEFAULT false,
	CONSTRAINT "PK_USER" PRIMARY KEY (id),
	CONSTRAINT "User_username_key" UNIQUE (username),
	CONSTRAINT uq_email UNIQUE (email)

);
-- ddl-end --
ALTER TABLE public."User" OWNER TO admin;
-- ddl-end --

-- object: public."Ad_ID_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."Ad_ID_seq" CASCADE;
CREATE SEQUENCE public."Ad_ID_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
ALTER SEQUENCE public."Ad_ID_seq" OWNER TO admin;
-- ddl-end --

-- object: public."Ad" | type: TABLE --
-- DROP TABLE IF EXISTS public."Ad" CASCADE;
CREATE TABLE public."Ad"(
	id integer NOT NULL DEFAULT nextval('public."Ad_ID_seq"'::regclass),
	"serviceType" smallint NOT NULL,
	title character varying(350) NOT NULL,
	description character varying(1200) NOT NULL,
	tariffs character varying(850),
	cooking boolean DEFAULT false,
	housework boolean DEFAULT false,
	schoolwork boolean DEFAULT false,
	music boolean DEFAULT false,
	"UserId" smallint NOT NULL,
	"createdAt" character varying,
	"updatedAt" character varying,
	CONSTRAINT "PK_AD" PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public."Ad" OWNER TO admin;
-- ddl-end --

-- object: public."Languages_ID_seq" | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public."Languages_ID_seq" CASCADE;
CREATE SEQUENCE public."Languages_ID_seq"
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
ALTER SEQUENCE public."Languages_ID_seq" OWNER TO postgres;
-- ddl-end --

-- object: public."Languages" | type: TABLE --
-- DROP TABLE IF EXISTS public."Languages" CASCADE;
CREATE TABLE public."Languages"(
	id integer NOT NULL DEFAULT nextval('public."Languages_ID_seq"'::regclass),
	name character varying(256) NOT NULL,
	level smallint DEFAULT 0,
	CONSTRAINT "PK_LANG" PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public."Languages" OWNER TO postgres;
-- ddl-end --

-- object: public."User_Lang" | type: TABLE --
-- DROP TABLE IF EXISTS public."User_Lang" CASCADE;
CREATE TABLE public."User_Lang"(
	id_user smallint NOT NULL,
	id_lang smallint NOT NULL,
	CONSTRAINT "PK_USER_LANG" PRIMARY KEY (id_user,id_lang)

);
-- ddl-end --
ALTER TABLE public."User_Lang" OWNER TO postgres;
-- ddl-end --

-- object: public.databasechangeloglock | type: TABLE --
-- DROP TABLE IF EXISTS public.databasechangeloglock CASCADE;
CREATE TABLE public.databasechangeloglock(
	id integer NOT NULL,
	locked boolean NOT NULL,
	lockgranted timestamp,
	lockedby character varying(255),
	CONSTRAINT pk_databasechangeloglock PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.databasechangeloglock OWNER TO nannyfinder;
-- ddl-end --

-- object: public.databasechangelog | type: TABLE --
-- DROP TABLE IF EXISTS public.databasechangelog CASCADE;
CREATE TABLE public.databasechangelog(
	id character varying(255) NOT NULL,
	author character varying(255) NOT NULL,
	filename character varying(255) NOT NULL,
	dateexecuted timestamp NOT NULL,
	orderexecuted integer NOT NULL,
	exectype character varying(10) NOT NULL,
	md5sum character varying(35),
	description character varying(255),
	comments character varying(255),
	tag character varying(255),
	liquibase character varying(20),
	contexts character varying(255),
	labels character varying(255),
	deployment_id character varying(10)
);
-- ddl-end --
ALTER TABLE public.databasechangelog OWNER TO nannyfinder;
-- ddl-end --

-- object: public.hibernate_sequence | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.hibernate_sequence CASCADE;
CREATE SEQUENCE public.hibernate_sequence
	INCREMENT BY 50
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1000
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
ALTER SEQUENCE public.hibernate_sequence OWNER TO nannyfinder;
-- ddl-end --

-- object: public.jhi_user | type: TABLE --
-- DROP TABLE IF EXISTS public.jhi_user CASCADE;
CREATE TABLE public.jhi_user(
	id bigint NOT NULL,
	login character varying(50) NOT NULL,
	password_hash character varying(60),
	first_name character varying(50),
	last_name character varying(50),
	email character varying(100),
	image_url character varying(256),
	activated boolean NOT NULL,
	lang_key character varying(5),
	activation_key character varying(20),
	reset_key character varying(20),
	created_by character varying(50) NOT NULL,
	created_date timestamp NOT NULL,
	reset_date timestamp,
	last_modified_by character varying(50),
	last_modified_date timestamp,
	CONSTRAINT pk_jhi_user PRIMARY KEY (id),
	CONSTRAINT jhi_user_login_key UNIQUE (login),
	CONSTRAINT jhi_user_email_key UNIQUE (email)

);
-- ddl-end --
ALTER TABLE public.jhi_user OWNER TO nannyfinder;
-- ddl-end --

-- object: idx_user_login | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_user_login CASCADE;
CREATE UNIQUE INDEX idx_user_login ON public.jhi_user
	USING btree
	(
	  login
	)	WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: idx_user_email | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_user_email CASCADE;
CREATE UNIQUE INDEX idx_user_email ON public.jhi_user
	USING btree
	(
	  email
	)	WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: public.jhi_authority | type: TABLE --
-- DROP TABLE IF EXISTS public.jhi_authority CASCADE;
CREATE TABLE public.jhi_authority(
	name character varying(50) NOT NULL,
	CONSTRAINT pk_jhi_authority PRIMARY KEY (name)

);
-- ddl-end --
ALTER TABLE public.jhi_authority OWNER TO nannyfinder;
-- ddl-end --

-- object: public.jhi_user_authority | type: TABLE --
-- DROP TABLE IF EXISTS public.jhi_user_authority CASCADE;
CREATE TABLE public.jhi_user_authority(
	user_id bigint NOT NULL,
	authority_name character varying(50) NOT NULL,
	CONSTRAINT jhi_user_authority_pkey PRIMARY KEY (user_id,authority_name)

);
-- ddl-end --
ALTER TABLE public.jhi_user_authority OWNER TO nannyfinder;
-- ddl-end --

-- object: public.jhi_persistent_token | type: TABLE --
-- DROP TABLE IF EXISTS public.jhi_persistent_token CASCADE;
CREATE TABLE public.jhi_persistent_token(
	series character varying(20) NOT NULL,
	user_id bigint,
	token_value character varying(20) NOT NULL,
	token_date date,
	ip_address character varying(39),
	user_agent character varying(255),
	CONSTRAINT pk_jhi_persistent_token PRIMARY KEY (series)

);
-- ddl-end --
ALTER TABLE public.jhi_persistent_token OWNER TO nannyfinder;
-- ddl-end --

-- object: public.jhi_persistent_audit_event | type: TABLE --
-- DROP TABLE IF EXISTS public.jhi_persistent_audit_event CASCADE;
CREATE TABLE public.jhi_persistent_audit_event(
	event_id bigint NOT NULL,
	principal character varying(50) NOT NULL,
	event_date timestamp,
	event_type character varying(255),
	CONSTRAINT pk_jhi_persistent_audit_event PRIMARY KEY (event_id)

);
-- ddl-end --
ALTER TABLE public.jhi_persistent_audit_event OWNER TO nannyfinder;
-- ddl-end --

-- object: public.jhi_persistent_audit_evt_data | type: TABLE --
-- DROP TABLE IF EXISTS public.jhi_persistent_audit_evt_data CASCADE;
CREATE TABLE public.jhi_persistent_audit_evt_data(
	event_id bigint NOT NULL,
	name character varying(150) NOT NULL,
	value character varying(255),
	CONSTRAINT jhi_persistent_audit_evt_data_pkey PRIMARY KEY (event_id,name)

);
-- ddl-end --
ALTER TABLE public.jhi_persistent_audit_evt_data OWNER TO nannyfinder;
-- ddl-end --

-- object: idx_persistent_audit_event | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_persistent_audit_event CASCADE;
CREATE INDEX idx_persistent_audit_event ON public.jhi_persistent_audit_event
	USING btree
	(
	  principal,
	  event_date
	)	WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: idx_persistent_audit_evt_data | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_persistent_audit_evt_data CASCADE;
CREATE INDEX idx_persistent_audit_evt_data ON public.jhi_persistent_audit_evt_data
	USING btree
	(
	  event_id
	)	WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: fk_ad_user | type: CONSTRAINT --
-- ALTER TABLE public."Ad" DROP CONSTRAINT IF EXISTS fk_ad_user CASCADE;
ALTER TABLE public."Ad" ADD CONSTRAINT fk_ad_user FOREIGN KEY ("UserId")
REFERENCES public."User" (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "FK_USER_USERLANG" | type: CONSTRAINT --
-- ALTER TABLE public."User_Lang" DROP CONSTRAINT IF EXISTS "FK_USER_USERLANG" CASCADE;
ALTER TABLE public."User_Lang" ADD CONSTRAINT "FK_USER_USERLANG" FOREIGN KEY (id_user)
REFERENCES public."User" (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "FK_LANG_USERLANG" | type: CONSTRAINT --
-- ALTER TABLE public."User_Lang" DROP CONSTRAINT IF EXISTS "FK_LANG_USERLANG" CASCADE;
ALTER TABLE public."User_Lang" ADD CONSTRAINT "FK_LANG_USERLANG" FOREIGN KEY (id_lang)
REFERENCES public."Languages" (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_authority_name | type: CONSTRAINT --
-- ALTER TABLE public.jhi_user_authority DROP CONSTRAINT IF EXISTS fk_authority_name CASCADE;
ALTER TABLE public.jhi_user_authority ADD CONSTRAINT fk_authority_name FOREIGN KEY (authority_name)
REFERENCES public.jhi_authority (name) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_user_id | type: CONSTRAINT --
-- ALTER TABLE public.jhi_user_authority DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;
ALTER TABLE public.jhi_user_authority ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
REFERENCES public.jhi_user (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_user_persistent_token | type: CONSTRAINT --
-- ALTER TABLE public.jhi_persistent_token DROP CONSTRAINT IF EXISTS fk_user_persistent_token CASCADE;
ALTER TABLE public.jhi_persistent_token ADD CONSTRAINT fk_user_persistent_token FOREIGN KEY (user_id)
REFERENCES public.jhi_user (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_evt_pers_audit_evt_data | type: CONSTRAINT --
-- ALTER TABLE public.jhi_persistent_audit_evt_data DROP CONSTRAINT IF EXISTS fk_evt_pers_audit_evt_data CASCADE;
ALTER TABLE public.jhi_persistent_audit_evt_data ADD CONSTRAINT fk_evt_pers_audit_evt_data FOREIGN KEY (event_id)
REFERENCES public.jhi_persistent_audit_event (event_id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: grant_f564b01bb0 | type: PERMISSION --
GRANT CONNECT,TEMPORARY
   ON DATABASE nannyfinder
   TO PUBLIC;
-- ddl-end --

-- object: grant_07a70fe20e | type: PERMISSION --
GRANT CREATE,CONNECT,TEMPORARY
   ON DATABASE nannyfinder
   TO admin;
-- ddl-end --


