@extends('layouts.main')

@section('head-title'){{ $contact->subject }} @endsection

@section('content')
    <h1>{{ $contact->subject }}</h1>

    <div class="alert alert-info">
        <h3>{{ $contact->message }}</h3>
        <p>{{ $contact->email }} - {{ $contact->name }}</p>
        <p><small>{{ $contact->created_at }}</small></p>
        <a href="{{ route('contact-update', $contact->id) }}"><button class="btn btn-info">Edit</button></a>
        <a href="{{ route('contact-delete', $contact->id) }}"><button class="btn btn-danger">Delete</button></a>
    </div>
@endsection
