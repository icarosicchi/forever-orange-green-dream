begin;

do $$
declare
  owner_user_id uuid;
  partner_user_id uuid;
  shared_space_id uuid;
begin
  select id into owner_user_id from auth.users where email = 'icarosicchi@gmail.com' limit 1;

  if owner_user_id is null then
    raise exception 'Nao foi possivel localizar o usuario %', 'icarosicchi@gmail.com';
  end if;

  select id into partner_user_id from auth.users where email = 'mfpcortez@usp.br' limit 1;

  insert into public.spaces (slug, name, description, created_by)
  values ('eu-e-tu-tatu', 'Eu e Tu, Tatu', 'Espaco compartilhado do casal.', owner_user_id)
  on conflict (slug) do update
  set name = excluded.name,
      description = excluded.description
  returning id into shared_space_id;

  insert into public.space_members (space_id, user_id, role)
  values (shared_space_id, owner_user_id, 'owner')
  on conflict (space_id, user_id) do update
  set role = 'owner',
      updated_at = now();

  if partner_user_id is not null then
    insert into public.space_members (space_id, user_id, role)
    values (shared_space_id, partner_user_id, 'editor')
    on conflict (space_id, user_id) do update
    set role = 'editor',
        updated_at = now();
  end if;

  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua personalidade', 'personality', 1, 'love:l-1')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua vontade', 'personality', 2, 'love:l-2')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua disciplina', 'personality', 3, 'love:l-3')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua responsabilidade', 'personality', 4, 'love:l-4')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua inteligência', 'personality', 5, 'love:l-5')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua dedicação', 'personality', 6, 'love:l-6')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu gênio forte', 'personality', 7, 'love:l-7')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeito de defender seus valores', 'personality', 8, 'love:l-8')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu carinho por sua família', 'personality', 9, 'love:l-9')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeito manhoso de ser', 'personality', 10, 'love:l-10')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você ativa o modo nenequinha', 'personality', 11, 'love:l-11')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Suas manias', 'personality', 12, 'love:l-12')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Suas músicas', 'personality', 13, 'love:l-13')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seus filmes', 'personality', 14, 'love:l-14')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua cultura', 'personality', 15, 'love:l-15')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua curiosidade', 'personality', 16, 'love:l-16')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu posicionamento', 'personality', 17, 'love:l-17')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'O jeito que você pede desculpas', 'personality', 18, 'love:l-18')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu instinto', 'personality', 19, 'love:l-19')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me entende', 'personality', 20, 'love:l-20')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me permite ser eu mesmo', 'personality', 21, 'love:l-21')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me cuida', 'personality', 22, 'love:l-22')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você se preocupa comigo', 'personality', 23, 'love:l-23')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você ama receber carinho', 'personality', 24, 'love:l-24')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você enxerga o futuro', 'personality', 25, 'love:l-25')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua sinceridade', 'personality', 26, 'love:l-26')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua companhia', 'personality', 27, 'love:l-27')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua risada', 'personality', 28, 'love:l-28')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu senso de humor', 'personality', 29, 'love:l-29')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Suas piadas', 'personality', 30, 'love:l-30')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua ironia', 'personality', 31, 'love:l-31')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu respeito', 'personality', 32, 'love:l-32')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me torna o melhor de mim', 'personality', 33, 'love:l-33')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua paixão', 'personality', 34, 'love:l-34')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua independência', 'personality', 35, 'love:l-35')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua gratidão', 'personality', 36, 'love:l-36')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua beleza encantadora', 'personality', 37, 'love:l-37')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua presença', 'personality', 38, 'love:l-38')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua simpatia', 'personality', 39, 'love:l-39')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu lado nerdolinha', 'personality', 40, 'love:l-40')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua confiança em mim', 'personality', 41, 'love:l-41')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua admiração e fé em mim', 'personality', 42, 'love:l-42')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seus olhos', 'beauty', 43, 'love:l-43')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua boca', 'beauty', 44, 'love:l-44')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu sorriso', 'beauty', 45, 'love:l-45')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu cabelo ondulado perfeitinho', 'beauty', 46, 'love:l-46')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu nariz', 'beauty', 47, 'love:l-47')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu rosto', 'beauty', 48, 'love:l-48')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Suas orelhas', 'beauty', 49, 'love:l-49')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu queixinho', 'beauty', 50, 'love:l-50')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Suas bochechinhas', 'beauty', 51, 'love:l-51')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seus lábios', 'beauty', 52, 'love:l-52')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu braço', 'beauty', 53, 'love:l-53')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu selinho', 'beauty', 54, 'love:l-54')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu beijo demorado', 'beauty', 55, 'love:l-55')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Suas pernocas', 'beauty', 56, 'love:l-56')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seus bracinhos', 'beauty', 57, 'love:l-57')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu pé', 'beauty', 58, 'love:l-58')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua coxa', 'beauty', 59, 'love:l-59')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua barriguinha', 'beauty', 60, 'love:l-60')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seus peitos', 'beauty', 61, 'love:l-61')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua bunda', 'beauty', 62, 'love:l-62')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua mãozinha', 'beauty', 63, 'love:l-63')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu dedinho com aliança', 'beauty', 64, 'love:l-64')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu corpo escultural', 'beauty', 65, 'love:l-65')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu umbiguinho', 'beauty', 66, 'love:l-66')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Suas pintas', 'beauty', 67, 'love:l-67')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu óculos', 'beauty', 68, 'love:l-68')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu cheiro', 'beauty', 69, 'love:l-69')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Sua pele macia', 'beauty', 70, 'love:l-70')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu pescoço', 'beauty', 71, 'love:l-71')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você deita no meu peito', 'beauty', 72, 'love:l-72')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nossos beijos especiais', 'moments', 73, 'love:l-73')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nossas brincadeiras', 'moments', 74, 'love:l-74')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nosso autisminho', 'moments', 75, 'love:l-75')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeito de ficar surpresa', 'moments', 76, 'love:l-76')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeito bobinho de pensar às vezes', 'moments', 77, 'love:l-77')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeito de se distrair', 'moments', 78, 'love:l-78')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Ter você', 'moments', 79, 'love:l-79')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Pensar em você', 'moments', 80, 'love:l-80')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Planejar o futuro com você', 'moments', 81, 'love:l-81')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Ficar à toa com você', 'moments', 82, 'love:l-82')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Viajar com você', 'moments', 83, 'love:l-83')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Fazer planos', 'moments', 84, 'love:l-84')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Jogar algo com você', 'moments', 85, 'love:l-85')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Assistir algo com você', 'moments', 86, 'love:l-86')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Conversar com você', 'moments', 87, 'love:l-87')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Me aconchegar com você', 'moments', 88, 'love:l-88')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Dirigir com você', 'moments', 89, 'love:l-89')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Comer com você', 'moments', 90, 'love:l-90')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me apoia', 'moments', 91, 'love:l-91')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você compartilha minhas loucuras', 'moments', 92, 'love:l-92')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como estamos misturando nossas manias', 'moments', 93, 'love:l-93')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nossas sapequices', 'moments', 94, 'love:l-94')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você fica animada contando uma fofoca', 'moments', 95, 'love:l-95')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nossa presença', 'moments', 96, 'love:l-96')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você é minha sombrinha quando está com vergonha', 'moments', 97, 'love:l-97')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Segurar sua mão', 'little-things', 98, 'love:l-98')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me entende', 'little-things', 99, 'love:l-99')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me permite ser eu mesmo', 'little-things', 100, 'love:l-100')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você me cuida', 'little-things', 101, 'love:l-101')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você se preocupa comigo', 'little-things', 102, 'love:l-102')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você ama receber carinho', 'little-things', 103, 'love:l-103')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você enxerga o futuro', 'little-things', 104, 'love:l-104')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu carinho por sua família', 'little-things', 105, 'love:l-105')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'O jeito que você pede desculpas', 'little-things', 106, 'love:l-106')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você fala nada com nada quando vai dormir', 'little-things', 107, 'love:l-107')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeitinho manhoso de ser', 'inside-jokes', 108, 'love:l-108')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você ativa o modo nenequinha', 'inside-jokes', 109, 'love:l-109')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nossas piadas internas', 'inside-jokes', 110, 'love:l-110')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeito bobinho de pensar às vezes', 'inside-jokes', 111, 'love:l-111')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu jeito de se distrair', 'inside-jokes', 112, 'love:l-112')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você fica animada contando uma fofoca', 'inside-jokes', 113, 'love:l-113')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como estamos misturando nossas manias', 'inside-jokes', 114, 'love:l-114')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Como você é minha sombrinha quando está com vergonha', 'inside-jokes', 115, 'love:l-115')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Ser babai e babae', 'inside-jokes', 116, 'love:l-116')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.love_items (space_id, user_id, text, category, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Ser fofos e queridos por muitos', 'inside-jokes', 117, 'love:l-117')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Viajar para a Itália na Primavera', 'viagem', 'nosso', false, 1, 'bucket:local-1')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Viajar para a Argentina e comer muita carne', 'viagem', 'meu', false, 2, 'bucket:local-2')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Viajar para a Europa ou EUA', 'viagem', 'nosso', false, 3, 'bucket:local-3')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Assistir às luzes da Aurora Boreal juntos', 'aventura', 'nosso', false, 4, 'bucket:local-4')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Conhecer o Salar de Uyuni', 'aventura', 'nosso', false, 5, 'bucket:local-5')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Ir para a Guatemala ver vulcões', 'aventura', 'teu', false, 6, 'bucket:local-6')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Fazer um passeio de balão de ar quente ao amanhecer', 'aventura', 'meu', false, 7, 'bucket:local-7')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Fazer observação das estrelas no deserto do Atacama', 'aventura', 'nosso', false, 8, 'bucket:local-8')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Fazer uma aula de culinária juntos', 'experiencia', 'meu', false, 9, 'bucket:local-9')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Assistir a um show ao vivo do ABBA (Holograma)', 'experiencia', 'teu', false, 10, 'bucket:local-10')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Assistir a um show ao vivo do Red Hot Chilli Peppers', 'experiencia', 'meu', false, 11, 'bucket:local-11')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Fazer uma sessão de fotos para capturar nosso amor', 'experiencia', 'meu', true, 12, 'bucket:local-12')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Ir assistir um Grand Slam, de preferência Wimbledon', 'experiencia', 'nosso', false, 13, 'bucket:local-13')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Ficarmos ricos o suficiente para não passar vontade', 'meta', 'nosso', false, 14, 'bucket:local-14')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Casarmos e termos uma família', 'meta', 'nosso', false, 15, 'bucket:local-15')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Aprender um novo idioma juntos', 'meta', 'meu', false, 16, 'bucket:local-16')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Começar uma tradição que continuaremos por anos', 'meta', 'meu', false, 17, 'bucket:local-17')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.bucket_items (space_id, user_id, text, category, type, completed, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Escrever cartas de amor para abrir em um aniversário especial', 'meta', 'meu', false, 18, 'bucket:local-18')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, text = excluded.text, category = excluded.category, type = excluded.type, completed = excluded.completed, sort_order = excluded.sort_order, updated_at = now();
  insert into public.countdown_events (space_id, user_id, title, date, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nosso Próximo Mesversário', '2025-05-21', 'Porque não basta comemorar os anos, hehe', 1, 'countdown:c-1')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, title = excluded.title, date = excluded.date, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.countdown_events (space_id, user_id, title, date, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Próxima Viagem para o Rio', '2026-02-15', 'Ansiosoooo, nossa viagem anual!!', 2, 'countdown:c-2')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, title = excluded.title, date = excluded.date, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.countdown_events (space_id, user_id, title, date, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Seu próximo niverrr hehe', '2026-05-13T22:14:00', 'Sempre especial!!!', 3, 'countdown:c-3')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, title = excluded.title, date = excluded.date, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.countdown_events (space_id, user_id, title, date, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 'Nosso Casamento', '?', 'O dia mais especial das nossas vidas... Detalhes em breve!', 4, 'countdown:c-4')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, title = excluded.title, date = excluded.date, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2023-12-04', 'Primeira Conversa', 'Obrigado Corey bêbado. Não sei como você me suportou akakakka', '/images/print_comeco.jpg', 1, 'timeline:t-1')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2021-12-11', 'Nossa primeiro grande bate-papo', 'Conversamos muuuuuito, juro por tudo que me apaixonei nesse momento', '/images/alianca.jpg', 2, 'timeline:t-2')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2021-12-18', 'Primeira vez que nos vimos', 'Eu fui conhecer VOCÊ, mas você é bobinha de mais pra acreditar', '/images/memory102.jpg', 3, 'timeline:t-3')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2021-12-20', 'Primeiro Encontrooo', 'Saímos num date pela primeira vezzzzz. Foi simplesmente sensacional, tudo que rolou hehe', '/images/memory103.jpg', 4, 'timeline:t-4')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2022-02-15', 'Reencontro depois do "webnamoro"', 'Foi tão bom te ver. E foi a primeira vez...', null, 5, 'timeline:t-5')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2022-03-21', 'Pedido de namorooooo', 'Melhor coisa que já fiz na minha vida!!!!!!', '/images/namoro.jpg', 6, 'timeline:t-6')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2022-05-14', 'Seu niverrrr', 'Conheci grande parte da sua família, mas eles não sabiam quem eu era', '/images/memory115.jpg', 7, 'timeline:t-7')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2023-01-19', 'Primeira vez em Juquehy', 'Finalmente conheci sua prainhaaaa', null, 8, 'timeline:t-8')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2024-02-15', 'Nossa primeira viagem pro Riooooo', 'Eu e tu doidinhos indo ver qualyfing hehe, mas foi incrível!!!', '/images/memory49.jpg', 9, 'timeline:t-9')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2025-01-01', 'Nosso primeiro ano novo juntos', 'Ameeeeeiiii, eu, tu e os fogos de Juquehy', '/images/memory15.jpg', 10, 'timeline:t-10')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.timeline_events (space_id, user_id, date, title, description, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '2025-02-19', 'Nossa segunda viagem pro Riooooo', 'Foi ótimo também, pena que o João e sua febre não colaboraram', '/images/memory89.jpg', 11, 'timeline:t-11')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, date = excluded.date, title = excluded.title, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory8.jpg', 'Memoria #8', 1, 'food:food-0')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory22.jpg', 'Memoria #22', 2, 'food:food-1')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory27.jpg', 'Memoria #27', 3, 'food:food-2')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory32.jpg', 'Memoria #32', 4, 'food:food-3')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory38.jpg', 'Memoria #38', 5, 'food:food-4')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory39.jpg', 'Memoria #39', 6, 'food:food-5')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory59.jpg', 'Memoria #59', 7, 'food:food-6')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory61.jpg', 'Memoria #61', 8, 'food:food-7')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory64.jpg', 'Memoria #64', 9, 'food:food-8')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory65.jpg', 'Memoria #65', 10, 'food:food-9')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory68.jpg', 'Memoria #68', 11, 'food:food-10')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory75.jpg', 'Memoria #75', 12, 'food:food-11')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory76.jpg', 'Memoria #76', 13, 'food:food-12')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory80.jpg', 'Memoria #80', 14, 'food:food-13')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory81.jpg', 'Memoria #81', 15, 'food:food-14')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory85.jpg', 'Memoria #85', 16, 'food:food-15')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory99.jpg', 'Memoria #99', 17, 'food:food-16')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory100.jpg', 'Memoria #100', 18, 'food:food-17')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory102.jpg', 'Memoria #102', 19, 'food:food-18')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.food_items (space_id, user_id, image_url, description, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, '/images/memory108.jpg', 'Memoria #108', 20, 'food:food-19')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id, image_url = excluded.image_url, description = excluded.description, sort_order = excluded.sort_order, updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 1, 'Memoria #1', '15 de janeiro de 2025 - Tu e eu no jogo do Palmeiras em Barueriii', '/images/memory1.jpg', 1, 'memory:1')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 2, 'Memoria #2', '29 de junho - Eu e tu assistindo jogos no nosso primeiro interusppp', '/images/memory2.jpg', 2, 'memory:2')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 3, 'Memoria #3', '3 de julho de 2022 - Eu, tu, tua mãe e tua irmã. Acho que foi quando eu conehci elasss, no reminho', '/images/memory3.jpg', 3, 'memory:3')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 4, 'Memoria #4', '15 de julho de 2022 - Eu, tu e meus paisss. Foi quando você conheceu eles?', '/images/memory4.jpg', 4, 'memory:4')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 5, 'Memoria #5', '2 de agosto de 2022 - Foi quando você conheceu minha prima, e sua prima kkkkkk', '/images/memory5.jpg', 5, 'memory:5')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 6, 'Memoria #6', '4 de agosto de 2022 - Eu e tu em algum lugar hehe', '/images/memory6.jpg', 6, 'memory:6')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 7, 'Memoria #7', '7 de agosto de 2022 - Eu e tu no hard rock de Ribeirão', '/images/memory7.jpg', 7, 'memory:7')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 8, 'Memoria #8', '14 de agosto de 2022 - Tu e eu no carroooo', '/images/memory8.jpg', 8, 'memory:8')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 9, 'Memoria #9', 'Não sei de quando - Eu e tu comendo japaaaaa', '/images/memory9.jpg', 9, 'memory:9')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 10, 'Memoria #10', '24 de setembro de 2022 - Eu e tu ostentando as aliança', '/images/memory10.jpg', 10, 'memory:10')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 11, 'Memoria #11', '30 de setembro de 2022 - Eu e tu dando uma linguadinha...', '/images/memory11.jpg', 11, 'memory:11')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 12, 'Memoria #12', '28 de outubro de 2022 - Eu, tu e primo de vestido!!!', '/images/memory12.jpg', 12, 'memory:12')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 13, 'Memoria #13', 'Carnafarra X - Eu e tu lindos e gostosos', '/images/memory13.jpg', 13, 'memory:13')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 14, 'Memoria #14', 'Num seeeiii - Eu tentando engolir tu que tá linda', '/images/memory14.jpg', 14, 'memory:14')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 15, 'Memoria #15', '1 de janeiro de 2025 - Tu e eu vendo os fogos de ano novoooo', '/images/memory15.jpg', 15, 'memory:15')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 16, 'Memoria #16', 'Carnafarra Y - Eu e tu na nossa fotinha de coraçãooooo', '/images/memory16.jpg', 16, 'memory:16')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 17, 'Memoria #17', 'Algum dia hehe - Tu e teu cabelo maravilhoso todo vinho potente deslumbrante', '/images/memory17.jpg', 17, 'memory:17')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 18, 'Memoria #18', 'Não sei também, sorry - Eu e tu por aí no mundo se amando', '/images/memory18.jpg', 18, 'memory:18')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 19, 'Memoria #19', '14 de fevereiro de 2022 - Eu e tu... Provavelmente você não vai gostar dessa foto aqui, mas tive que colocar, foi um momento especial hehe', '/images/memory19.jpg', 19, 'memory:19')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 20, 'Memoria #20', '18 de março de 2022 - Eu e tu no becooo, quando ainda era moda kk', '/images/memory20.jpg', 20, 'memory:20')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 21, 'Memoria #21', '18 de março de 2022 - Eu e tu no beco de novooo akakakaakk. Rara imagem dos dois mostrando o piano, como diz seu pai', '/images/memory21.jpg', 21, 'memory:21')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 22, 'Memoria #22', '20 de maio de 2022 - Eu e tu papando Hamburgerrrr', '/images/memory22.jpg', 22, 'memory:22')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 23, 'Memoria #23', '20 de maio de 2022 - Tu e eu de mascarinhass, acho que indo ou voltando do burger kkkk', '/images/memory23.jpg', 23, 'memory:23')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 24, 'Memoria #24', '23 de maio de 2022 - Eu e tu no CAM. Toma essa beijoca', '/images/memory24.jpg', 24, 'memory:24')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 25, 'Memoria #25', '3 de junho de 2022 - Eu e tu no Zé do hambúrguer ebaaaa, adoro lá mo. Lindos nós dois', '/images/memory25.jpg', 25, 'memory:25')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 26, 'Memoria #26', '20 de julho de 2022 - Tu e eu no elevador do meu prédio. Muito rockeiros🤟', '/images/memory26.jpg', 26, 'memory:26')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 27, 'Memoria #27', 'Algum dia de hamburger - Sorrisinho da gatinha de guardanapo', '/images/memory27.jpg', 27, 'memory:27')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 28, 'Memoria #28', '6 de outubro de 2022 - Eu e tu no meu espelhinho, simples e queridos', '/images/memory28.jpg', 28, 'memory:28')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 29, 'Memoria #29', '26 de janeiro de 2023 - Eu e tu passeandinho com o Tobby, você cuidando dele e eu cuidando de você hehe', '/images/memory29.jpg', 29, 'memory:29')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 30, 'Memoria #30', '3 de abril de 2023 - Vocêzinha, princesinha, bonitinha e maluquinha', '/images/memory30.jpg', 30, 'memory:30')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 31, 'Memoria #31', '19 de fevereiro de 2024 - Tu e eu no metrô do Rio. Sim, tem muitas fotos do Rio akaakaka', '/images/memory31.jpg', 31, 'memory:31')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 32, 'Memoria #32', 'Algum dia de nossas vidas - Eu e tu comendo foundueeeee, hiper chiques baby', '/images/memory32.jpg', 32, 'memory:32')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 33, 'Memoria #33', '24 de julho de 2022 - Eu, cocolina e tu', '/images/memory33.jpg', 33, 'memory:33')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 34, 'Memoria #34', '5 de agosto de 2022 - Tu e eu no Borelli akaakakkaka. Lembro que falamos disso em dias, não sabia que fazia tanto tempo mds', '/images/memory34.jpg', 34, 'memory:34')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 35, 'Memoria #35', '18 de agosto de 2022 - Eu, fotógrafo apaixonado, e tu linda com o doguinho lindo do canil', '/images/memory35.jpg', 35, 'memory:35')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 36, 'Memoria #36', '1 de fevereiro de 2023 - Eu e tu no meu elevador de novo, mas dessa vez chiquetosos', '/images/memory36.jpg', 36, 'memory:36')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 37, 'Memoria #37', '21 de abril de 2023 - Eu e tu em aparecidaaaaaa', '/images/memory37.jpg', 37, 'memory:37')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 38, 'Memoria #38', 'Nós dois juntos - Eu e tu no Madero papando hehe', '/images/memory38.jpg', 38, 'memory:38')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 39, 'Memoria #39', '11 de janeiro de 2024 - Eu e tu em Juquehy ebaaaa. Gostosa você ein!!', '/images/memory39.jpg', 39, 'memory:39')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 40, 'Memoria #40', '23 de janeiro de 2024 - Eu, tu e Cocolina hamburgando', '/images/memory40.jpg', 40, 'memory:40')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 41, 'Memoria #41', '23 de janeiro de 2024 - Eu e tu no cão veiooooo', '/images/memory41.jpg', 41, 'memory:41')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 42, 'Memoria #42', '30 de janeiro de 2024 - Eu e tu na cadimia. Raras imagens...', '/images/memory42.jpg', 42, 'memory:42')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 43, 'Memoria #43', '9 de fevereiro de 2024 - Eu e tu muito fitness na época que tínhamos tempo kkkkk ', '/images/memory43.jpg', 43, 'memory:43')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 44, 'Memoria #44', '14 de fevereiro de 2024 - Tu e eu em su casita. Eu entendendo nada akaakakak', '/images/memory44.jpg', 44, 'memory:44')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 45, 'Memoria #45', '16 de fevereiro de 2024 - Eu e tu no becooo, amados queridos', '/images/memory45.jpg', 45, 'memory:45')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 46, 'Memoria #46', '18 de fevereiro de 2024 - Tu amiguinha da natureza comigo no jardim botânico. Temos que voltar laaaa', '/images/memory46.jpg', 46, 'memory:46')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 47, 'Memoria #47', '18 de fevereiro de 2024 - Eu e tu nas palmeiras do jardim botânico. Com um turista exigente de fotografo akakaka', '/images/memory47.jpg', 47, 'memory:47')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 48, 'Memoria #48', '18 de fevereiro de 2024 - Eu e tu no Rio Opennnn, fala deles', '/images/memory48.jpg', 48, 'memory:48')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 49, 'Memoria #49', '18 de fevereiro de 2024 - Outro ângulo de eu e tu no Rio Opennn. Pra provar que não era uma arquibancada qualquer hehe', '/images/memory49.jpg', 49, 'memory:49')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 50, 'Memoria #50', '19 de fevereiro de 2024 - Eu e tu na confeitaria Colombo, ui ui ui, coisa de realeza tá?', '/images/memory50.jpg', 50, 'memory:50')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 51, 'Memoria #51', '19 de fevereiro de 2024 - Tu toda linda princesa na escadaria Selaron', '/images/memory51.jpg', 51, 'memory:51')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 52, 'Memoria #52', '19 de fevereiro de 2024 - Eu e tu na favela, mentira, na Selaronn', '/images/memory52.jpg', 52, 'memory:52')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 53, 'Memoria #53', '19 de fevereiro de 2024 - Eu e tu de boax na praia meu amor', '/images/memory53.jpg', 53, 'memory:53')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 54, 'Memoria #54', '20 de fevereiro de 2024 - Tu e eu ciclistas no Rio de Janeiro que continua lindo', '/images/memory54.jpg', 54, 'memory:54')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 55, 'Memoria #55', '20 de fevereiro de 2024 - Eu e tu a papar no riooo', '/images/memory55.jpg', 55, 'memory:55')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 56, 'Memoria #56', '20 de fevereiro de 2024 - Tu e eu lindicos gatitos', '/images/memory56.jpg', 56, 'memory:56')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 57, 'Memoria #57', '19 de fevereiro de 2024 - Tu e eu no metrô do Rio, uma fortuna slk ', '/images/memory57.jpg', 57, 'memory:57')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 58, 'Memoria #58', '20 de fevereiro de 2024 - Tu e eu na Confeitaria Colombo, fala deles', '/images/memory58.jpg', 58, 'memory:58')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 59, 'Memoria #59', '20 de fevereiro de 2024 - Tu e eu papando pokeeee, pena que virou trauma kakaakak', '/images/memory59.jpg', 59, 'memory:59')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 60, 'Memoria #60', '25 de fevereiro de 2024 - Eu e tu chiquetosos na formatura da Bia', '/images/memory60.jpg', 60, 'memory:60')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 61, 'Memoria #61', '25 de fevereiro de 2024 - Eu e tu com meu casaquinho porque tava com frio na festa', '/images/memory61.jpg', 61, 'memory:61')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 62, 'Memoria #62', '5 de maio de 2024 - Tu se despedindo da queridinha Eco, que Deus a tenha', '/images/memory62.jpg', 62, 'memory:62')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 63, 'Memoria #63', '6 de maio de 2024 - Tu posando pra fotinha que eu sai tirando até o fim da mecanica porque sou autistinha akaak', '/images/memory63.jpg', 63, 'memory:63')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 64, 'Memoria #64', '17 de maio de 2024 - Tu e eu embaixo de uma árvore (não lembro onde é kkkkkk)', '/images/memory64.jpg', 64, 'memory:64')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 65, 'Memoria #65', '29 de maio de 2024 - Eu, tu e a CAMzaiada no Mc do Interusp', '/images/memory65.jpg', 65, 'memory:65')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 66, 'Memoria #66', '31 de maio de 2024 - Tu e eu sem luz na tenda do Interusp', '/images/memory66.jpg', 66, 'memory:66')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 67, 'Memoria #67', '31 de maio de 2024 - Tu e eu com luz na tenda do Interusp', '/images/memory67.jpg', 67, 'memory:67')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 68, 'Memoria #68', '22 de junho de 2024 - Tu GATA PRA KRL e eu no show da Marisa na USP uhuuuu', '/images/memory68.jpg', 68, 'memory:68')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 69, 'Memoria #69', '2 de julho de 2024 - Tu, eu e Calça tirando foto pro trabalho de Atuadores kkkkkk', '/images/memory69.jpg', 69, 'memory:69')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 70, 'Memoria #70', '17 de agosto de 2024 - Eu, tu e Cocolina em algum lugar', '/images/memory70.jpg', 70, 'memory:70')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 71, 'Memoria #71', '20 de agosto de 2024 - Eu tirando foto de tu nanante aconchegada', '/images/memory71.jpg', 71, 'memory:71')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 72, 'Memoria #72', '4 de outubro de 2024 - Eu e tu em algum chopis', '/images/memory72.jpg', 72, 'memory:72')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 73, 'Memoria #73', '20 de novembro de 2024 - Tu vindo me visitar no hospital em Ribeirão. Muito perfeita!', '/images/memory73.jpg', 73, 'memory:73')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 74, 'Memoria #74', '1 de janeiro de 2025 - Tu recebendo beijinho meu no primeiro dia do ano', '/images/memory74.jpg', 74, 'memory:74')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 75, 'Memoria #75', '1 de março de 2025 - Tu e eu na escada rolante do shopis', '/images/memory75.jpg', 75, 'memory:75')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 76, 'Memoria #76', '29 de setembro de 2024 - Tu toda coordenadora gatinha da oficina', '/images/memory76.jpg', 76, 'memory:76')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 77, 'Memoria #77', '28 de outubro de 2024 - Eu experimentando blusa e tu sorrindinha princesa', '/images/memory77.jpg', 77, 'memory:77')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 78, 'Memoria #78', '27 de novembro de 2024 - Tu nanante na minha kitnetzinha', '/images/memory78.jpg', 78, 'memory:78')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 79, 'Memoria #79', '31 de dezembro de 2024 - Eu e tu de oclinho de ano novo hehe', '/images/memory79.jpg', 79, 'memory:79')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 80, 'Memoria #80', '31 de dezembro de 2024 - Tu e eu lindos e maravilhosos na virada do ano', '/images/memory80.jpg', 80, 'memory:80')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 81, 'Memoria #81', '1 de janeiro de 2025 - Eu e tu nos fogos de Juquehyyyyyyyyy uhuuuuuuuu', '/images/memory81.jpg', 81, 'memory:81')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 82, 'Memoria #82', '1 de janeiro de 2025 - Eu e tu no primeiro dia do anooooo. Você toda gostosa e eu cheio das dobrinhas ja', '/images/memory82.jpg', 82, 'memory:82')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 83, 'Memoria #83', '3 de janeiro de 2025 - Eu e tu no As Ilhasssssss, rango bão!', '/images/memory83.jpg', 83, 'memory:83')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 84, 'Memoria #84', '3 de janeiro de 2025 - Tu e eu batendo uma tranca honesta. Provavelmente fui amassado kk', '/images/memory84.jpg', 84, 'memory:84')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 85, 'Memoria #85', '6 de janeiro de 2025 - Eu e tu em Juquehy com seu cabelo lindinho lindinho vermelhinho', '/images/memory85.jpg', 85, 'memory:85')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 86, 'Memoria #86', '24 de janeiro de 2025 - Tu no rancho, distraíduxa e linduxa', '/images/memory86.jpg', 86, 'memory:86')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 87, 'Memoria #87', '26 de janeiro de 2025 - Eu e tu no ranchoooo. Você amou esse dog, achei fofissimo', '/images/memory87.jpg', 87, 'memory:87')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 88, 'Memoria #88', '9 de fevereiro de 2025 - eu admirando tu num dia comum', '/images/memory88.jpg', 88, 'memory:88')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 89, 'Memoria #89', '22 de fevereiro de 2025 - Tu e eu no Cristo Redentorrrr. Eu, com a sétima e a oitava maravilha do mundo', '/images/memory89.jpg', 89, 'memory:89')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 90, 'Memoria #90', '23 de fevereiro de 2025 - Eu e tu no Rio esse anooooo', '/images/memory90.jpg', 90, 'memory:90')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 91, 'Memoria #91', '1 de março de 2025 - Tu e eu na escada rolante do shopis', '/images/memory91.jpg', 91, 'memory:91')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 92, 'Memoria #92', '1 de março e 2025 - Tu me beijando e eu fazendo gracinha, lero lero', '/images/memory92.jpg', 92, 'memory:92')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 93, 'Memoria #93', '15 de março de 2025 - Tu nanando gotosooooo, eu vendo né ', '/images/memory93.jpg', 93, 'memory:93')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 94, 'Memoria #94', '15 de março de 2025 - Eu tirando foto de tu no aniversário da Cocolina', '/images/memory94.jpg', 94, 'memory:94')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 95, 'Memoria #95', '9 de maio de 2025 - Tu e eu comendo na Baccio hmmmm', '/images/memory95.jpg', 95, 'memory:95')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 96, 'Memoria #96', '15 de junho 2022 - Acho que sou eu e tu indo para Ribeirão, ebaaaa. Primeira vez??', '/images/memory96.jpg', 96, 'memory:96')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 97, 'Memoria #97', '2 de julho de 2022 - Eu cabeludo e tu linda como sempre. Não lembro onde foi akaakaka', '/images/memory97.jpg', 97, 'memory:97')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 98, 'Memoria #98', '2 de julho de 2022 - Eu e tu de colares combinandinhooo. Acho que estamos na raia aakakakaak', '/images/memory98.jpg', 98, 'memory:98')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 99, 'Memoria #99', '4 de julho de 2022 - Eu lambendo tu dormindo, em mi casita, na cama gigante', '/images/memory99.jpg', 99, 'memory:99')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 100, 'Memoria #100', '4 de fevereiro de 2023 - Eu e tu, tatu. Não lembro onde é akakaakaks', '/images/memory100.jpg', 100, 'memory:100')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 101, 'Memoria #101', '19 de dezembro de 2021 - Eu e tu no nosso primeiro encontrooooo', '/images/memory101.jpg', 101, 'memory:101')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 102, 'Memoria #102', '17 de dezembro de 2021 - Eu conhecendo tuuuuuu (sonho realizado)', '/images/memory102.jpg', 102, 'memory:102')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 103, 'Memoria #103', '19 de dezembro de 2021 - Tu e eu no nosso primeiro encontrooooo, lindossss', '/images/memory103.jpg', 103, 'memory:103')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 104, 'Memoria #104', '26 de Janeiro de 2022 - Eu e tu numa call no disc há muuuuito tempo atrás. Estávamos no nosso web namoro hehe', '/images/memory104.jpg', 104, 'memory:104')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 105, 'Memoria #105', '3 de Fevereiro de 2022 - Cari, tu e eu no cantinho. Gosto dessa foto. Estava quase me mudando e liguei pra vc e vc tava na CAM', '/images/memory105.jpg', 105, 'memory:105')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 106, 'Memoria #106', '24 de abril de 2022 - Eu, tu e a Bia no Carnafarra. Não lembro se era o 1 ou 2', '/images/memory106.jpg', 106, 'memory:106')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 107, 'Memoria #107', '29 de maio de 2022 - Finalmente me assumiu pro mundo, zoas kkkkkk. Amo essa fotinha', '/images/memory107.jpg', 107, 'memory:107')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 108, 'Memoria #108', '25 de junho de 2022 - Não tem eu, mas tem tu e sua família linda, tive que por também ', '/images/memory108.jpg', 108, 'memory:108')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 109, 'Memoria #109', '6 de julho de 2022 - Ainda bem que roubei, melhor coisa que fiz. Adoro esse efeito', '/images/memory109.jpg', 109, 'memory:109')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 110, 'Memoria #110', 'Não lembro quando foi - Mas eu e tu me abraçandinho por trás, amo!', '/images/memory110.jpg', 110, 'memory:110')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 111, 'Memoria #111', '20 de setembro de 2022 - Eu e tu no meu elevador com as roupitchas do nosso primeiro dateeeee', '/images/memory111.jpg', 111, 'memory:111')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 112, 'Memoria #112', '24 de dezembro de 2022 - Véspera de Natal, nosso primeiro Natal namorando mexmo, a curva mais perfeita da natureza na foto aí ', '/images/memory112.jpg', 112, 'memory:112')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 113, 'Memoria #113', '15 de Janeiro 2023 - Eu e tu em Juquehy uhuuuuuu, passeio de barcooo, fala deles', '/images/memory113.jpg', 113, 'memory:113')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 114, 'Memoria #114', '23 de abril de 2023 - Tu e eu nessa foto clássica!! Linguarudos no carnafarra', '/images/memory114.jpg', 114, 'memory:114')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 115, 'Memoria #115', '13 de maio de 2023 -Eu e tu no seu niverrrrrrrrrrr, conheci sua familiaaaa', '/images/memory115.jpg', 115, 'memory:115')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 116, 'Memoria #116', 'Não sei quando foi esse mas amo essa foto. Eu e tu descolados', '/images/memory116.jpg', 116, 'memory:116')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 117, 'Memoria #117', '12 de junho de 2022 - Eu e tu na USP de Reberão', '/images/memory117.jpg', 117, 'memory:117')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 118, 'Memoria #118', '25 de dezembro de 2023 - Mais um Natal. Tu lindíssima e eu admirando muitissimo', '/images/memory118.jpg', 118, 'memory:118')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 119, 'Memoria #119', '11 de maio de 2024 - Tu no ronco na call e eu te admirando hehe', '/images/memory119.jpg', 119, 'memory:119')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 120, 'Memoria #120', '9 de outubro de 2024 - Novamente tu fazendo gracinha. Muito sapeca levada da breca (não consigo aprender desculpa akakaka)', '/images/memory120.jpg', 120, 'memory:120')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 121, 'Memoria #121', '11 de outubro de 2024 - Eu com tu fazendo gracinha numa call', '/images/memory121.jpg', 121, 'memory:121')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 122, 'Memoria #122', '12 de janeiro de 2024 - Eu carregando tu em Juquehyyyyyyyyyyy', '/images/memory122.jpg', 122, 'memory:122')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 123, 'Memoria #123', '12 de janeiro de 2024 - Eu com tu dançando em Juquehyyyyyyyyyyy', '/images/memory123.jpg', 123, 'memory:123')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 124, 'Memoria #124', '30 de abril de 2022 - Eu e minha frô, que também ganhou uma frôoo', '/images/memory124.jpg', 124, 'memory:124')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 125, 'Memoria #125', '25 de novembro de 2024 - Tu e eu numa call. Dessa vez você não minha casa🤔', '/images/memory125.jpg', 125, 'memory:125')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 126, 'Memoria #126', '16 de dezembro de 2024 - Eu flagrando tu fazendo nojeirice. Que feio!', '/images/memory126.jpg', 126, 'memory:126')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 127, 'Memoria #127', '27 de dezembro de 2024 - Tu e eu numa call, você toda linda com o cabelo finalizado, que deusa mds', '/images/memory127.jpg', 127, 'memory:127')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 128, 'Memoria #128', '26 de fevereiro de 2025 - Tu brava e eu sorridente sapeca', '/images/memory128.jpg', 128, 'memory:128')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 129, 'Memoria #129', '8 de março - Eu e tu no niver da Thaisss', '/images/memory129.jpg', 129, 'memory:129')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
  insert into public.memories (space_id, user_id, memory_id, title, content, image_url, sort_order, legacy_key)
  values (shared_space_id, owner_user_id, 130, 'Memoria #130', '1 de maio de 2025 - Foto recente de euzinho e tu nenenzinha', '/images/memory130.jpg', 130, 'memory:130')
  on conflict (space_id, legacy_key) where legacy_key is not null do update
  set user_id = excluded.user_id,
      memory_id = excluded.memory_id,
      title = excluded.title,
      content = excluded.content,
      image_url = excluded.image_url,
      sort_order = excluded.sort_order,
      updated_at = now();
end
$$;

commit;
